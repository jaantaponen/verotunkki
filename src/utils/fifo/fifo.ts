/*
*  Extended from https://github.com/bernardobelchior/fifo-capital-gains-js/blob/master/src/capital-gains.ts
*/
import { Operation, Transaction } from './types';
import _ from 'lodash';

export interface CapitalResults {
  /**
   * Sale that triggered the capital gains
   */
  transactions: Transaction[]

  /**
   * Capital gains triggered from the sale
   */
  capitalGainPerSellDate: number
}

/**
 * Calculates the FIFO capital gains for the given operation history.
 * It separates capital gains of securities using the symbols given
 * in each operation.
 *
 * @param operationHistory History of operations (buy and sales) to
 * calculate the capital gains for.
 *
 * @throws If the amount of securities of all sell operations of a given symbol
 * exceeds the amount of securities of all buy operations for the same symbol.
 * This indicates that there is an error in the input, since it is not possible
 * to sell more securities than the ones bought.
 *
 * @returns The FIFO capital gains with details of the transaction details
 * for each sell operation
 *
 * [
    {
        "capitalGainPerSellDate": -315.6,
        "transactions": [
            {
                "ticker": "GME",
                "buydate": "2019-02-01T00:00:00.000Z",
                "selldate": "2020-03-01T00:00:00.000Z",
                "amountsold": 3,
                "transferPrice": 50,
                "profitOrLoss": -300,
                "acquisitionPrice": 150,
                "acquisitionFee": 4.2,
                "transferFee": 4.1
            },
            {
                "ticker": "GME",
                "buydate": "2020-01-01T00:00:00.000Z",
                "selldate": "2020-03-01T00:00:00.000Z",
                "amountsold": 1,
                "transferPrice": 50,
                "profitOrLoss": 0,
                "acquisitionPrice": 50,
                "acquisitionFee": 3.2,
                "transferFee": 4.1
            }
        ]
    },
    {
        "capitalGainPerSellDate": 97.7,
        "transactions": [
            {
                "ticker": "GME",
                "buydate": "2020-01-01T00:00:00.000Z",
                "selldate": "2020-04-01T00:00:00.000Z",
                "amountsold": 3,
                "transferPrice": 86,
                "profitOrLoss": 108,
                "acquisitionPrice": 50,
                "acquisitionFee": 3.2,
                "transferFee": 7.1
            }
        ]
    },
    {
        "capitalGainPerSellDate": 995.6999999999999,
        "transactions": [
            {
                "ticker": "BB",
                "buydate": "2020-02-01T00:00:00.000Z",
                "selldate": "2021-01-01T00:00:00.000Z",
                "amountsold": 10,
                "transferPrice": 150,
                "profitOrLoss": 1000,
                "acquisitionPrice": 50,
                "acquisitionFee": 2.2,
                "transferFee": 2.1
            }
        ]
    }
]
 */
export function calculateFIFOCapitalGains(
  operationHistory: Operation[]
): CapitalResults[] {
  const sortedOperationHistory = _.sortBy(operationHistory, o => new Date(o.date))
  const sales = sortedOperationHistory.filter(({ type }) => type === 'SELL');
  return sales.reduce<CapitalResults[]>(
    (capitalGainPerSellDate, sale) => [
      ...capitalGainPerSellDate,
      calculateCapitalGainsForSale(sortedOperationHistory, sale),
    ],
    []
  );
}

/**
 * Calculates the FIFO capital gains for the given operation history. 
 * Transfer fees are divided between SELL operations, so the end resulting
 * SELL batch trasnferprice for the bought asset remains the same.
 *
 * @param operationHistory History of operations (buy and sales) to
 * calculate the capital gains for. 
 *
 * @returns The FIFO transaction details by every sold security
 * example
 *  {
        ticker: 'GME',
        buydate: 2020-01-01T00:00:00.000Z,
        selldate: 2020-04-01T00:00:00.000Z,
        amountsold: 3,
        transferPrice: 86,
        profitOrLoss: 108,
        acquisitionPrice: 50,
        acquisitionFee: 3.2,
        transferFee: 7.1
      },
      {
        ticker: 'BB',
        buydate: 2020-02-01T00:00:00.000Z,
        selldate: 2021-01-01T00:00:00.000Z,
        amountsold: 10,
        transferPrice: 150,
        profitOrLoss: 1000,
        acquisitionPrice: 50,
        acquisitionFee: 2.2,
        transferFee: 2.1
      }
 *
 */
export const calculateFIFOTransactions = (operationHistory: Operation[]): Transaction[] => {
  const correctedTransferFees = calculateFIFOCapitalGains(operationHistory).flatMap((gainByDate) => {
    const totalSoldAmount = _.sumBy(gainByDate.transactions, (o) => o.amountsold)
    const dividedFees = gainByDate.transactions.map(x => ({
      ...x,
      transferFee: (x.amountsold / totalSoldAmount) * x.transferFee,
    }))
    const transferFeeForSell = gainByDate.transactions[0] ? gainByDate.transactions[0].transferFee : 0
    const transferFeeSummedFromSELLOperation = _.sumBy(dividedFees, (o) => o.transferFee)
    if (transferFeeForSell !== transferFeeSummedFromSELLOperation) {
      console.warn(`Amount of fees for do not match for ${gainByDate.transactions[0]?.ticker}: ${transferFeeForSell} and ${transferFeeSummedFromSELLOperation}`)
    }
    return dividedFees
  });
  if (correctedTransferFees.length === 0) {
    throw new Error("No SELL transactions found. Have you sold any asset?")
  }
  const correctedAcquisitionFees = correctedTransferFees.map(x => {
    const amoutntBought = _.sumBy(correctedTransferFees.filter(y => y.buydate === x.buydate), o => o.amountsold)
    return {
      ...x,
      acquisitionFee: (x.amountsold / amoutntBought) * x.acquisitionFee,
    }
  })
  return correctedAcquisitionFees
}


const calculateCapitalGainsForSale = (
  operationHistory: Operation[],
  sale: Operation
): CapitalResults => {
  let capitalGainPerSellDate = 0;
  const transactions: Transaction[] = [];
  const relatedBuyTransactions = _.orderBy(operationHistory, (o: Operation) => [new Date(o.date), o.type], ['asc', 'desc']).filter(
    ({ type, symbol, date }) =>
      type === 'BUY' && symbol === sale.symbol && date <= sale.date
  );

  // Order the result set in ASC order so the oldest buy operations are handled first
  relatedBuyTransactions.forEach(
    (buy) => {
      const amountSold = Math.min(sale.amount, buy.amount);
      // if the total amount of held shares have not yet been sold
      if (amountSold === 0) return;
      const trs: Transaction = {
        ticker: sale.symbol,
        buydate: buy.date,
        selldate: sale.date,
        amountsold: amountSold,
        transferPrice: sale.price,
        profitOrLoss: amountSold * (sale.price - buy.price),
        acquisitionPrice: buy.price,
        acquisitionFee: buy.transactionFee,
        transferFee: sale.transactionFee,
      };
      transactions.push(trs);

      buy.amount -= amountSold;
      sale.amount -= amountSold;
      // We reduce the transactionsfees from the capital gain
      const totalPrice =
        amountSold * (sale.price - buy.price)
      capitalGainPerSellDate += totalPrice;
    }
  );
  // TODO: removee nii perkeleesti ja implementoi uudestaan paremmin
  //if (Number(sale.amount ?  sale.amount.toFixed(6) : 0) > 0) {
  if (Math.round(sale.amount) > 0) {
    throw Error(
      `Amount of sales for ticker ${sale.symbol} exceeds the amount of buys by ${sale.amount}. In transaction made in ${new Date(sale.date)
        .toLocaleString('en-GB', { timeZone: 'UTC' })}`
    );
  }

  return {
    capitalGainPerSellDate,
    transactions: transactions,
  };
};

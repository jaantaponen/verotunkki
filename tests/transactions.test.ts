import { Operation } from '../src/utils/fifo';
import { calculateFIFOTransactions, calculateFIFOCapitalGains } from '../src/utils/fifo';

describe('calculateFIFO', () => {
  it('calculates FIFO transactions details with multiple tickers', () => {
    const operationHistory: Operation[] = [
      {
        amount: 12,
        date: new Date('2020-01-01'),
        price: 50,
        symbol: 'GME',
        type: 'BUY',
        transactionFee: 3.2,
      },
      {
        amount: 3,
        date: new Date('2019-02-01'),
        price: 150,
        symbol: 'GME',
        type: 'BUY',
        transactionFee: 4.2,
      },
      {
        amount: 10,
        date: new Date('2020-02-01'),
        price: 50,
        symbol: 'BB',
        type: 'BUY',
        transactionFee: 2.2,
      },
      {
        amount: 4,
        date: new Date('2020-03-01'),
        price: 50,
        symbol: 'GME',
        type: 'SELL',
        transactionFee: 4.1,
      },
      {
        amount: 3,
        date: new Date('2020-04-01'),
        price: 86,
        symbol: 'GME',
        type: 'SELL',
        transactionFee: 7.1,
      },
      {
        amount: 10,
        date: new Date('2021-01-01'),
        price: 150,
        symbol: 'BB',
        type: 'SELL',
        transactionFee: 2.1,
      },
    ];
    const transactions = JSON.parse(JSON.stringify(calculateFIFOTransactions(operationHistory).map(x => ({
      ...x,
      transferPrice: x.transferPrice.toFixed(2),
      acquisitionPrice: x.acquisitionPrice.toFixed(2),
      acquisitionFee: x.acquisitionFee.toFixed(2),
      transferFee: x.transferFee.toFixed(2),
      profitOrLoss: x.profitOrLoss.toFixed(2),
    }))))
    expect(transactions).toEqual(JSON.parse(JSON.stringify([
      {
        ticker: 'GME',
        buydate: new Date('2019-02-01'),
        selldate: new Date('2020-03-01'),
        amountsold: 3,
        transferPrice: 50,
        profitOrLoss: -300,
        acquisitionPrice: 150,
        acquisitionFee: 4.2,
        transferFee: 3.0749999999999997
      },
      {
        ticker: 'GME',
        buydate: new Date('2020-01-01'),
        selldate: new Date('2020-03-01'),
        amountsold: 1,
        transferPrice: 50,
        profitOrLoss: 0,
        acquisitionPrice: 50,
        acquisitionFee: 0.8,
        transferFee: 1.025
      },
      {
        ticker: 'GME',
        buydate: new Date('2020-01-01'),
        selldate: new Date('2020-04-01'),
        amountsold: 3,
        transferPrice: 86,
        profitOrLoss: 108,
        acquisitionPrice: 50,
        acquisitionFee: 2.4,
        transferFee: 7.1
      },
      {
        ticker: 'BB',
        buydate: new Date('2020-02-01'),
        selldate: new Date('2021-01-01'),
        amountsold: 10,
        transferPrice: 150,
        profitOrLoss: 1000,
        acquisitionPrice: 50,
        acquisitionFee: 2.2,
        transferFee: 2.1
      }
    ].map(x => ({
      ...x,
      transferPrice: x.transferPrice.toFixed(2),
      acquisitionPrice: x.acquisitionPrice.toFixed(2),
      acquisitionFee: x.acquisitionFee.toFixed(2),
      transferFee: x.transferFee.toFixed(2),
      profitOrLoss: x.profitOrLoss.toFixed(2),
    })))));
  });

  // https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/48262/arvopaperien-luovutusten-verotus3/#2.4
  // exampe three from section 2.4
  it('calculate by using example from finnish tax authority', () => {
    const operationHistoryBertta: Operation[] = [
      {
        amount: 200,
        date: new Date('2015-01-01'),
        price: 6000 / 200,
        symbol: 'Yhtio Oy',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 800,
        date: new Date('2016-01-01'),
        price: 10000 / 800,
        symbol: 'Yhtio Oy',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 1000,
        date: new Date('2017-01-01'),
        price: 20,
        symbol: 'Yhtio Oy',
        type: 'SELL',
        transactionFee: 0,
      },
    ];
    const gains = calculateFIFOCapitalGains(operationHistoryBertta);
    expect(gains).toEqual([
      {
        capitalGainPerSellDate: 4000,
        transactions: [
          {
            ticker: "Yhtio Oy",
            buydate: new Date('2016-01-01'),
            selldate: new Date('2017-01-01'),
            amountsold: 800,
            transferPrice: 20,
            profitOrLoss: 6000,
            acquisitionPrice: 12.5,
            acquisitionFee: 0,
            transferFee: 0
          },
          {
            ticker: "Yhtio Oy",
            buydate: new Date('2015-01-01'),
            selldate: new Date('2017-01-01'),
            amountsold: 200,
            transferPrice: 20,
            profitOrLoss: -2000,
            acquisitionPrice: 30,
            acquisitionFee: 0,
            transferFee: 0
          }
        ]
      }
    ]);
  });


  it('calculates FIFO capital gains with intercalated buys and sales', () => {
    const operationHistory: Operation[] = [
      {
        amount: 10,
        date: new Date('2020-01-01'),
        price: 100,
        symbol: 'STK1',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 10,
        date: new Date('2020-02-01'),
        price: 150,
        symbol: 'STK2',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 5,
        date: new Date('2020-03-01'),
        price: 200,
        symbol: 'STK1',
        type: 'SELL',
        transactionFee: 0,
      },
      {
        amount: 10,
        date: new Date('2020-04-01'),
        price: 250,
        symbol: 'STK1',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 10,
        date: new Date('2021-01-01'),
        price: 200,
        symbol: 'STK2',
        type: 'SELL',
        transactionFee: 0,
      },
      {
        amount: 15,
        date: new Date('2022-01-01'),
        price: 300,
        symbol: 'STK1',
        type: 'SELL',
        transactionFee: 0,
      },
    ]
    const capitalGains = JSON.stringify(calculateFIFOCapitalGains(operationHistory))
    expect(JSON.parse(capitalGains)).toEqual([
      {
        "capitalGainPerSellDate": 500,
        "transactions": [
          {
            "ticker": "STK1",
            "buydate": "2020-01-01T00:00:00.000Z",
            "selldate": "2020-03-01T00:00:00.000Z",
            "amountsold": 5,
            "transferPrice": 200,
            "profitOrLoss": 500,
            "acquisitionPrice": 100,
            "acquisitionFee": 0,
            "transferFee": 0
          }
        ]
      },
      {
        "capitalGainPerSellDate": 500,
        "transactions": [
          {
            "ticker": "STK2",
            "buydate": "2020-02-01T00:00:00.000Z",
            "selldate": "2021-01-01T00:00:00.000Z",
            "amountsold": 10,
            "transferPrice": 200,
            "profitOrLoss": 500,
            "acquisitionPrice": 150,
            "acquisitionFee": 0,
            "transferFee": 0
          }
        ]
      },
      {
        "capitalGainPerSellDate": 1500,
        "transactions": [
          {
            "ticker": "STK1",
            "buydate": "2020-04-01T00:00:00.000Z",
            "selldate": "2022-01-01T00:00:00.000Z",
            "amountsold": 10,
            "transferPrice": 300,
            "profitOrLoss": 500,
            "acquisitionPrice": 250,
            "acquisitionFee": 0,
            "transferFee": 0
          },
          {
            "ticker": "STK1",
            "buydate": "2020-01-01T00:00:00.000Z",
            "selldate": "2022-01-01T00:00:00.000Z",
            "amountsold": 5,
            "transferPrice": 300,
            "profitOrLoss": 1000,
            "acquisitionPrice": 100,
            "acquisitionFee": 0,
            "transferFee": 0
          }
        ]
      }
    ])
  })

  it("throws when a symbol's sales have a bigger amount than its buys", () => {
    const operationHistory: Operation[] = [
      {
        amount: 10,
        date: new Date('2020-01-01'),
        price: 100,
        symbol: 'STK1',
        type: 'BUY',
        transactionFee: 0,
      },
      {
        amount: 15,
        date: new Date('2020-03-01'),
        price: 200,
        symbol: 'STK1',
        type: 'SELL',
        transactionFee: 0,
      },
    ]

    expect(() => calculateFIFOCapitalGains(operationHistory)).toThrow()
  })

  it('throws when there are sales, but no buys', () => {
    const operationHistory: Operation[] = [
      {
        amount: 3,
        date: new Date('2020-04-01'),
        price: 86,
        symbol: 'GME',
        type: 'SELL',
        transactionFee: 7.1,
      },
    ];

    expect(() => calculateFIFOCapitalGains(operationHistory)).toThrow();
  });
  it('throws when input data is invalid', () => {
    //TODO
  });


  it('calculates FIFO fees correctly', () => {
    const operationHistory: Operation[] = [
      {
        amount: 51,
        date: new Date('2021-01-22'),
        price: 1967.95 / 51,
        symbol: 'GME',
        type: 'BUY',
        transactionFee: 15,
      },
      {
        amount: 50,
        date: new Date('2021-01-24'),
        price: 4041.11 / 50,
        symbol: 'GME',
        type: 'BUY',
        transactionFee: 15,
      },
      {
        amount: 50,
        date: new Date('2021-01-25'),
        price: 3976.53 / 50,
        symbol: 'GME',
        type: 'BUY',
        transactionFee: 15,
      },
      {
        amount: 20,
        date: new Date('2021-01-27'),
        price: 6106.88 / 20,
        symbol: 'GME',
        type: 'SELL',
        transactionFee: 15,
      },
      {
        amount: 131,
        date: new Date('2021-02-05'),
        price: 7031.34 / 131,
        symbol: 'GME',
        type: 'SELL',
        transactionFee: 15,
      },
    ]
    const gains = calculateFIFOTransactions(operationHistory)
    const rounded = gains.map(x => ({
      ...x,
      transferPrice: Math.floor(x.transferPrice),
      acquisitionPrice: Math.floor(x.acquisitionPrice),
      acquisitionFee: Math.floor(x.acquisitionFee),
      transferFee: Math.floor(x.transferFee),
      profitOrLoss: Math.floor(x.profitOrLoss),
    }))

    const a = [
      {
        ticker: "GME",
        buydate: new Date('2021-01-22'),
        selldate: new Date('2021-01-27'),
        amountsold: 20,
        transferPrice: 6121.88 / 20.01,
        profitOrLoss: 5335.14,
        acquisitionPrice: 765.86 / 20,
        acquisitionFee: 5.88,
        transferFee: 15.00
      },
      {
        ticker: "GME",
        buydate: new Date('2021-01-22'),
        selldate: new Date('2021-02-05'),
        amountsold: 31,
        transferPrice: 1667.45 / 31,
        profitOrLoss: 467.70,
        acquisitionPrice: 1187.09 / 31,
        acquisitionFee: 9.12,
        transferFee: 3.55
      },
      {
        ticker: "GME",
        buydate: new Date('2021-01-25'),
        selldate: new Date('2021-02-05'),
        amountsold: 50,
        transferPrice: 2689.44 / 50,
        profitOrLoss: -1292.81,
        acquisitionPrice: 3961.52 / 50,
        acquisitionFee: 15.00,
        transferFee: 5.73
      },
      {
        ticker: "GME",
        buydate: new Date('2021-01-24'),
        selldate: new Date('2021-02-05'),
        amountsold: 50,
        transferPrice: 2689.44 / 50,
        profitOrLoss: -1357.39,
        acquisitionPrice: 4026.11 / 50,
        acquisitionFee: 15,
        transferFee: 5.73
      },
    ].map(x => ({
      ...x,
      transferPrice: Math.floor(x.transferPrice),
      acquisitionPrice: Math.floor(x.acquisitionPrice),
      acquisitionFee: Math.floor(x.acquisitionFee),
      transferFee: Math.floor(x.transferFee),
      profitOrLoss: Math.floor(x.profitOrLoss),
    }))

    expect(rounded).toEqual(a)
  })
});

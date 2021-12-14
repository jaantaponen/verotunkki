import { parse } from 'csv-parse/dist/esm/sync'
import translateDegiro from './translations.js'
import moment from 'moment';
import { Operation } from '../fifo/types'
import { DegiroHeaders, CoinbaseHeaders, NordnetHeaders, CoinbaseProHeaders, CoinBaseProHeaderValues } from './types'
import { ColumnDataCrypto, ColumnDataSecurity } from '../../components/tableSettings'
//const input = fs.readFileSync('./files/transactions.csv', 'utf8').trim()
const parseDegiroCSV = (input: string): DegiroHeaders[] => {
    let prevField = ""
    const tmp = parse(input, {
        cast: (value, context) => {
            if (context.header) {
                if (value === '') return translateDegiro(`${prevField}-valuutta`);
                prevField = value
                return translateDegiro(value)
            }
            return String(value)
        },
        columns: true,
        trim: true,
    });

    const records: DegiroHeaders[] = tmp.map((transaction: any) => {
        transaction['datetime'] = moment(`${transaction.date}-${transaction.time}`, "DD-MM-YYYY-HH-mm").toDate()
        return transaction
    })
    /* 
        const transactions: Operation[] = records.map(record => {
            return {
                symbol: record.security,
                date: record.datetime,
                price: Math.abs(record.value / record.quantity), // get price in EUR
                amount: Math.abs(record.quantity),
                type: record.quantity > 0 ? "BUY" : "SELL",
                transactionFee: Math.abs(record.transactionCosts)
            }
        }) */

    return records.map(x => ({
        ...x, "Source": "Degiro"
    }))

}

const getDegiroAsColumns = (records: DegiroHeaders[]): ColumnDataSecurity[] => {
    const ret = records.map(record => {
        return {
            paivays: record.datetime.toUTCString(),
            tuote: record.security,
            isin: record.ISIN,
            arvo: `${record.value} ${record.valueCurrency}`,
            maara: record.quantity,
            kulut: record.transactionCosts,
            kurssi: `${record.rate} ${record.rateCurrency}`,
            kokonaissumma: `${record.totalAmount} ${record.totalAmountCurrency}`,
        } as ColumnDataSecurity
    })
    return ret
}

//const inputNordNet = fs.readFileSync('./files/transactions-and-notes-export2.csv', 'utf16le')
const parseNordNetCSV = (input: string): NordnetHeaders[] => {
    const tmp = parse(input, {
        delimiter: ["\t"],
        columns: true,
        trim: true,
        cast: (value, context) => {
            if (context.header) {
                let header = value
                if (header.includes('ä')) header = header.replace(/ä/g, 'a')
                if (header.includes('ö')) header = header.replace(/ö/g, 'o')
                if (header.includes('-')) header = header.replace(/-/g, '')
                return header.replace(/\s/g, '')
            }
            const column = context.column
            //these are probably unneeded
            if (column === 'Maara' ||
                column === 'Kurssi' ||
                column === 'Valityspalkkio' ||
                column === 'Summa' ||
                column === 'Kokonaiskulut' ||
                column === 'Kokonaismaara') return Number.parseFloat(value.replace(/,/g, '.'));
            if (column === 'Kirjauspaiva' ||
                column === 'Kauppapaiva' ||
                column === 'Maksupaiva') return moment(value, "YYYY-MM-DD").toDate()
            return String(value)
        },
    }) as NordnetHeaders[];
    return tmp.map(x => ({
        ...x, "Source": "Nordnet"
    }))
}
//const inputCoinbase = fs.readFileSync('./files/coinbase.csv', 'utf-8')
const parseCoinbaseCSV = (input: string): CoinbaseHeaders[] => {
    const tmp = parse(input, {
        cast: (value, context) => {
            if (context.header) {
                if (value.includes('(')) return value.split('(')[0].replace(/\s/g, '')
                return value.replace(/\s/g, '')
            }
            if (context.column === 'Timestamp') return moment(value, "YYYY-MM-DD-HH-mm").toDate()
            if (context.column === 'TransactionType') return value.toUpperCase()
            return String(value)
        },
        columns: true,
        from_line: 8,
        trim: true,
    }) as CoinbaseHeaders[];
    return tmp.map(x => ({
        ...x, "Source": "Coinbase"
    }))
}

const prepareCoinbaseForFIFO = (rawData: CoinbaseHeaders[]): Operation[] => {
    const prepareRawFifo: CoinbaseHeaders[] = []
    rawData.forEach(x => {
        if (x.TransactionType === 'CONVERT') {
            const info = x.Notes.split(' ')
            const soldAmount = info[1]
            const soldCurrency = info[2]
            const boughAmount = Number(info[4])
            const boughtCurrency = info[5]
            prepareRawFifo.push({
                ...x,
                TransactionType: "SELL",
                Fees: 0,
                Total: x.Total - x.Fees
            })
            prepareRawFifo.push({
                ...x,
                TransactionType: "BUY",
                Asset: boughtCurrency,
                QuantityTransacted: boughAmount,
                SpotPriceatTransaction: x.Subtotal / boughAmount
            })
        } else if (x.TransactionType === 'COINBASE EARN') {
            prepareRawFifo.push({
                ...x,
                TransactionType: "BUY",
            })
        } else if (x.TransactionType === 'RECEIVE') {
            prepareRawFifo.push({
                ...x,
                TransactionType: "BUY",
            })
        }

    })

    const dataFifo: Operation[] = rawData.concat(prepareRawFifo)
        .filter(x => x.TransactionType === 'BUY' || x.TransactionType === 'SELL')
        .map(record => {
            return {
                symbol: record.Asset,
                date: record.Timestamp,
                price: record.SpotPriceatTransaction,
                amount: record.QuantityTransacted,
                type: record.TransactionType as "BUY" | "SELL",
                transactionFee: record.Fees,
            }
        })
    return dataFifo

}


const getCoinbaseAsColumns = (records: CoinbaseHeaders[]): ColumnDataCrypto[] => {
    const ret = records.map(record => {
        return {
            paivays: record.Timestamp.toUTCString(),
            tuote: record.Asset,
            arvo: `${record.Subtotal ? record.Subtotal : record.QuantityTransacted * record.SpotPriceatTransaction} ${record.SpotPriceCurrency}`,
            maara: record.QuantityTransacted,
            kulut: `${record.Fees ? record.Fees : 0} ${record.SpotPriceCurrency}`,
            kurssi: `${record.SpotPriceatTransaction} ${record.SpotPriceCurrency}`,
            kokonaissumma: `${record.Total} ${record.SpotPriceCurrency}`,
            operaatio: record.TransactionType,
        } as ColumnDataCrypto
    })
    return ret
}


//const inputCoinbase = fs.readFileSync('./files/coinbase.csv', 'utf-8')
const parseCoinbaseProCSV = (input: string): CoinbaseProHeaders[] => {
    const tmp = parse(input, {
        cast: (value, context) => {
            if (context.header) {
                if (value.includes('/')) return value.replace(/\//g, '').replace(/\s/g, '')
                return value.replace(/\s/g, '')
            }
            if (context.column === 'createdat') return new Date(value)
            return String(value)
        },
        columns: true,
        trim: true,
    })

    if (Object.keys(tmp).find(x => CoinBaseProHeaderValues.includes(x))) {
        throw Error('All headers not found in CoinbasePro file.')
    }

    return tmp.map((x: any) => ({
        ...x, "Source": "CoinbasePro"
    })) as CoinbaseProHeaders[]
}

const getCoinbaseProAsColumns = (records: CoinbaseProHeaders[]): ColumnDataCrypto[] => {
    const ret = records.map(record => {
        return {
            paivays: record.createdat.toUTCString(),
            tuote: record.product,
            arvo: `${record.size * record.price} ${record.pricefeetotalunit}`,
            maara: record.size,
            kulut: `${record.fee ? record.fee : 0} ${record.pricefeetotalunit}`,
            kurssi: `${record.price} ${record.pricefeetotalunit}`,
            kokonaissumma: `${record.total} ${record.pricefeetotalunit}`,
            operaatio: record.side,
        } as ColumnDataCrypto
    })
    return ret
}


const prepareCoinbaseProForFIFO = (rawData: CoinbaseProHeaders[]): Operation[] => {
    return rawData
        .filter(x => x.side === 'BUY' || x.side === 'SELL')
        .map(record => {
            return {
                symbol: record.product,
                date: record.createdat,
                price: record.price,
                amount: record.size,
                type: record.side as "BUY" | "SELL",
                transactionFee: record.fee,
            }
        })
}



export { parseCoinbaseCSV, parseDegiroCSV, parseNordNetCSV, getDegiroAsColumns, getCoinbaseAsColumns, prepareCoinbaseForFIFO, parseCoinbaseProCSV, getCoinbaseProAsColumns,prepareCoinbaseProForFIFO }
//parseCoinbaseCSV(inputCoinbase)
//parseDegiroCSV(input)
//parseNordNetCSV(inputNordNet)
//console.log(parseDegiroCSV(input))
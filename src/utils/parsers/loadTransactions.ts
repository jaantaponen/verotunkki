import translateDegiro from './translations'
import moment from 'moment';
import { Operation } from '../fifo/types'
import { DegiroHeaders, CoinbaseHeaders, NordnetHeaders, CoinbaseProHeaders, CoinBaseProHeaderValues, CoinBaseHeaderValues, DegiroHeaderValues, NordnetHeaderValues } from './types'
import { ColumnDataCrypto, ColumnDataSecurity } from '../../components/tableSettings'
import _ from 'lodash';
import { loadParser } from './parseUtils';


const parseDegiroCSV = async (input: string): Promise<DegiroHeaders[]> => {
    let prevField = ""
    const parse = await loadParser()
    const tmp = parse(input, {
        cast: (value: any, context: any) => {
            if (context.header) {
                if (value === '') return translateDegiro(`${prevField}-valuutta` as any);
                prevField = value
                return translateDegiro(value)
            }
            return String(value)
        },
        columns: true,
        trim: true,
    });

    const results = []
    for await (const record of tmp) {
        results.push(record)
    }

    const records: DegiroHeaders[] = results.map((transaction: any) => {
        transaction['datetime'] = moment(`${transaction.date}-${transaction.time}`, "DD-MM-YYYY-HH-mm").toDate()
        return transaction
    })

    if (results.every(x => _.difference(_.sortBy(DegiroHeaderValues), _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Degiro file.')
    }

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
const parseNordNetCSV = async (input: string): Promise<NordnetHeaders[]> => {
    const parse = await loadParser()
    const tmp = parse(input, {
        delimiter: ["\t"],
        columns: true,
        trim: true,
        cast: (value: any, context: any) => {
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
    })

    const results = []
    for await (const record of tmp) {
        results.push(record)
    }

    if (results.every(x => _.difference(NordnetHeaderValues, _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Nordnet file.')
    }

    return results.map(x => ({
        ...x, "Source": "Nordnet"
    })) as NordnetHeaders[]
}
//const inputCoinbase = fs.readFileSync('./files/coinbase.csv', 'utf-8')
const parseCoinbaseCSV = async (input: string): Promise<CoinbaseHeaders[]> => {
    const parse = await loadParser()
    const results = parse(input, {
        cast: (value: any, context: any) => {
            if (context.header) {
                if (value.includes('(')) return value.split('(')[0].replace(/\s/g, '')
                return value.replace(/\s/g, '')
            }
            if (context.column === 'Timestamp') return moment(value, "YYYY-MM-DD-HH-mm").toISOString()
            if (context.column === 'TransactionType') return value.toUpperCase()
            return String(value)
        },
        columns: true,
        from_line: 8,
        trim: true,
    })
    if ((results ?? []).every((x: any) => _.difference(CoinBaseHeaderValues, _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Coinbase file.')
    }

    return results.map((x: any) => ({
        ...x, "Source": "Coinbase"
    })) as CoinbaseHeaders[];
}

const prepareCoinbaseForFIFO = (rawData: CoinbaseHeaders[]): Operation[] => {
    const prepareRawFifo: CoinbaseHeaders[] = []
    rawData.forEach(statement => {
        if (statement.TransactionType === 'CONVERT') {
            const info = statement.Notes.split(' ')
            const soldAmount = info[1]
            const soldCurrency = info[2]
            const boughAmount = Number(info[4])
            const boughtCurrency = info[5]
            prepareRawFifo.push({
                ...statement,
                TransactionType: "SELL",
                Fees: 0,
                Total: statement.Total - statement.Fees
            })
            prepareRawFifo.push({
                ...statement,
                TransactionType: "BUY",
                Asset: boughtCurrency,
                QuantityTransacted: boughAmount,
                SpotPriceatTransaction: statement.Subtotal / boughAmount
            })
        } else if (statement.TransactionType === 'COINBASE EARN') {
            prepareRawFifo.push({
                ...statement,
                TransactionType: "BUY",
            })
        } else if (statement.TransactionType === 'RECEIVE') {
            prepareRawFifo.push({
                ...statement,
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
                price: Number(record.SpotPriceatTransaction),
                amount: Number(record.QuantityTransacted),
                type: record.TransactionType as "BUY" | "SELL",
                transactionFee: Number(record.Fees ?? 0),
            }
        })
    return dataFifo

}


const getCoinbaseAsColumns = (records: CoinbaseHeaders[]): ColumnDataCrypto[] => {
    const ret = records.map(record => {
        const value = `${record.Subtotal ?
            Number(record.Subtotal).toFixed(2) :
            (record.QuantityTransacted * record.SpotPriceatTransaction).toFixed(2)
            } ${record.SpotPriceCurrency}`
        return {
            paivays: record.Timestamp.toLocaleString('fi-FI', { timeZone: 'UTC' }),
            tuote: record.Asset,
            arvo: value,
            maara: record.QuantityTransacted,
            kulut: `${Number(record.Fees ?? 0).toFixed(2)} ${record.SpotPriceCurrency}`,
            kurssi: `${record.SpotPriceatTransaction} ${record.SpotPriceCurrency}`,
            kokonaissumma: `${Number(record.Total ? record.Total : 0).toFixed(2)} ${record.SpotPriceCurrency}`,
            operaatio: record.TransactionType,
        } as ColumnDataCrypto
    })
    return ret
}


//const inputCoinbase = fs.readFileSync('./files/coinbase.csv', 'utf-8')
const parseCoinbaseProCSV = async (input: string): Promise<CoinbaseProHeaders[]> => {
    const parse = await loadParser()
    const tmp = parse(input, {
        cast: (value: any, context: any) => {
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

    const results = []
    for await (const record of tmp) results.push(record)


    if (results.every(x => _.difference(_.sortBy(CoinBaseProHeaderValues), _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Coinbase Pro file.')
    }


    return results.map((x: any) => ({
        ...x, "Source": "CoinbasePro"
    })) as CoinbaseProHeaders[]
}

const getCoinbaseProAsColumns = (records: CoinbaseProHeaders[]): ColumnDataCrypto[] => {
    const ret = records.map(record => {
        return {
            paivays: record.createdat.toLocaleString('fi-FI', { timeZone: 'UTC' }),
            tuote: record.product,
            arvo: `${record.size * record.price} ${record.pricefeetotalunit}`,
            maara: record.size,
            kulut: `${Number(record.fee ?? 0).toFixed(2)} ${record.pricefeetotalunit}`,
            kurssi: `${record.price} ${record.pricefeetotalunit}`,
            kokonaissumma: `${Number(record.total ?? 0).toFixed(2)} ${record.pricefeetotalunit}`,
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

export {
    parseCoinbaseCSV,
    parseDegiroCSV,
    parseNordNetCSV,
    getDegiroAsColumns,
    getCoinbaseAsColumns,
    prepareCoinbaseForFIFO,
    parseCoinbaseProCSV,
    getCoinbaseProAsColumns,
    prepareCoinbaseProForFIFO
}

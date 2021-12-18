import translateDegiro from './translations'
import moment from 'moment';
import 'moment-timezone';
import { Operation } from '../fifo/types'
import { DegiroHeaders, CoinbaseHeaders, CoinbaseProHeaders, CoinBaseProHeaderValues, CoinBaseHeaderValues, DegiroHeaderValues, NordnetHeaderValues, NordnetHeaders } from './types'
import { ColumnDataCrypto, ColumnDataSecurity } from '../../components/tableSettings'
import _ from 'lodash';
import { nanoid } from 'nanoid/async'
import { loadParser } from './helpers';


const getDataDegiro = async (input: string) => {
    const orig = await parseDegiroCSV(input)
    const column = getDegiroAsColumns(orig)
    return {
        orig: {Degiro : orig},
        rows: column
    }
}

const getDataNordnet = async (input: string) => {
    const orig = await parseNordnetCSV(input)
    const column = getNordnetAsColumns(orig)
    return {
        orig: {Nordnet : orig},
        rows: column
    }
}
const getDataCoinbase = async (input: string) => {
    const orig = await parseCoinbaseCSV(input)
    const column = getCoinbaseAsColumns(orig)
    return {
        orig: {Coinbase : orig},
        rows: column
    }
}

const getDataCoinbasePro = async (input: string) => {
    const orig = await parseCoinbaseProCSV(input)
    const column = getCoinbaseProAsColumns(orig)
    return {
        orig: {CoinbasePro : orig},
        rows: column
    }
}


/**
 * 
 * ************DEGIRO FUNCTIONS********************
 *
 */

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
    for await (const record of tmp) results.push(record)
    const records: DegiroHeaders[] = results.map((transaction: any) => {
        transaction['datetime'] = moment(`${transaction.date}-${transaction.time}`, "DD-MM-YYYY-HH-mm").toISOString()
        return transaction
    })

    if (results.every(x => _.difference(_.sortBy(DegiroHeaderValues), _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Degiro file.')
    }

    return (await Promise.all(records.map(async x => ({
        ...x, Source: "Degiro", id: (await nanoid(10))
    })))) as DegiroHeaders[]

}

const getDegiroAsColumns = (records: DegiroHeaders[]): ColumnDataSecurity[] => {
    const ret = records.map(record => {
        return {
            id: record.id,
            paivays: new Date(record.datetime),
            tuote: record.security,
            isin: record.ISIN,
            arvo: `${record.value} ${record.valueCurrency}`,
            maara: record.quantity,
            kulut: record.transactionCosts.toString(),
            kurssi: `${record.rate} ${record.rateCurrency}`,
            kokonaissumma: `${record.totalAmount} ${record.totalAmountCurrency}`,
            operation: record.quantity > 0 ? "BUY" : "SELL",
        } as ColumnDataSecurity
    })
    return ret
}

const prepareDegiroForFIFO = (rawData: DegiroHeaders[]): Operation[] => {
    return rawData
        .map(record => {
            return {
                symbol: record.security,
                date: record.datetime,
                price: record.rate,
                amount: record.quantity,
                type: record.quantity > 0 ? "BUY" : "SELL",
                transactionFee: Math.abs(record.transactionCosts),
            }
        })
}


/**
 * 
 * ************NORDNET FUNCTIONS********************
 *
 */

const parseNordnetCSV = async (input: string): Promise<NordnetHeaders[]> => {
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

    return (await Promise.all(results.map(async x => ({
        ...x, Source: "Nordnet", id: (await nanoid(10))
    })))) as NordnetHeaders[]
}

const getNordnetAsColumns = (records: NordnetHeaders[]): ColumnDataSecurity[] => {
    const ret = records.map(record => {
        return {
            id: record.id,
            paivays: new Date(record.Kauppapaiva),
            tuote: record.Arvopaperi,
            isin: record.ISIN,
            arvo: `${record.Summa} ${record.Valuutta}`,
            maara: record.Maara,
            kulut: record.Kokonaiskulut.toString(),
            kurssi: `${record.Kurssi} ${record.Valuutta}`,
            kokonaissumma: `${record.Summa - record.Kokonaiskulut} ${record.Valuutta}`,
            operation: record.Tapahtumatyyppi,
        } as ColumnDataSecurity
    })
    return ret
}


const prepareNordnetForFIFO = (rawData: NordnetHeaders[]): Operation[] => {
    return rawData
        .filter(x => x.Tapahtumatyyppi === 'MYYNTI' || x.Tapahtumatyyppi === 'OSTO')
        .map(record => {
            return {
                symbol: record.Arvopaperi,
                date: record.Kauppapaiva,
                price: record.Kurssi,
                amount: record.Maara,
                type: record.Tapahtumatyyppi === 'OSTO' ? "BUY" : "SELL",
                transactionFee: record.Kokonaiskulut,
            }
        })
}



/**
 * 
 * ************COINBASE FUNCTIONS********************
 *
 */

const parseCoinbaseCSV = async (input: string): Promise<CoinbaseHeaders[]> => {
    const startAt = _.findIndex(input?.split('\n'), (o) => o?.startsWith('Timestamp,Transaction'))
    const parse = await loadParser()
    const results = parse(input, {
        cast: (value: any, context: any) => {
            if (context.header) {
                if (value.includes('(')) return value.split('(')[0].replace(/\s/g, '')
                return value.replace(/\s/g, '')
            }
            moment.tz
            if (context.column === 'Timestamp') return moment(value, "YYYY-MM-DD-HH-mm-ss").toISOString()
            if (context.column === 'TransactionType') return value.toUpperCase()
            return String(value)
        },
        columns: true,
        from_line: startAt > 0 ? startAt + 1 : 1,
        trim: true,
    })
    if (results.every((x: any) => _.difference(CoinBaseHeaderValues, _.sortBy(Object.keys(x))).length !== 0)) {
        throw TypeError('All headers not found in the provided Coinbase file.')
    }

    return (await Promise.all(results.map(async (x: any) => ({
        ...x, Source: "Coinbase", id: (await nanoid(10))
    })))) as CoinbaseHeaders[]
}

const prepareCoinbaseForFIFO = (rawData: CoinbaseHeaders[]): Operation[] => {
    const prepareRawFifo: CoinbaseHeaders[] = []
    rawData.forEach(statement => {
        if (statement.TransactionType === 'CONVERT') {
            const info = statement.Notes.split(' ')
            //const soldAmount = info[1]
            //const soldCurrency = info[2]
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
                date: new Date(record.Timestamp),
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
            Number(record.Subtotal) : (record.QuantityTransacted * record.SpotPriceatTransaction)} ${record.SpotPriceCurrency}`
        return {
            id: record.id,
            paivays: new Date(record.Timestamp),
            tuote: record.Asset,
            arvo: value,
            maara: record.QuantityTransacted,
            kulut: `${Number(record.Fees) ? Number(record.Fees) : 0} ${record.SpotPriceCurrency}`,
            kurssi: `${record.SpotPriceatTransaction} ${record.SpotPriceCurrency}`,
            kokonaissumma: `${Number(record.Total ? record.Total : 0)} ${record.SpotPriceCurrency}`,
            operation: record.TransactionType,
        } as ColumnDataCrypto
    })
    return ret
}

/**
 * 
 * ************COINBASE PRO FUNCTIONS********************
 *
 */

const parseCoinbaseProCSV = async (input: string): Promise<CoinbaseProHeaders[]> => {
    const parse = await loadParser()
    const tmp = parse(input, {
        cast: (value: any, context: any) => {
            if (context.header) {
                if (value.includes('/')) return value.replace(/\//g, '').replace(/\s/g, '')
                return value.replace(/\s/g, '')
            }
            if (context.column === 'createdat') return new Date(value).toISOString()
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

    return (await Promise.all(results.map(async (x: any) => ({
        ...x, Source: "CoinbasePro",
        product: x.product.split('-')[0],
        Error: (x.pricefeetotalunit !== "EUR" ? "Invalid currency detected" : undefined),
        id: (await nanoid(10))
    })))) as CoinbaseProHeaders[]
}

const getCoinbaseProAsColumns = (records: CoinbaseProHeaders[]): ColumnDataCrypto[] => {
    const ret = records.map(record => {
        return {
            id: record.id,
            paivays: record.createdat,
            tuote: record.product,
            arvo: `${record.size * record.price} ${record.pricefeetotalunit}`,
            maara: record.size,
            kulut: `${record.fee ?? record.fee} ${record.pricefeetotalunit}`,
            kurssi: `${record.price} ${record.pricefeetotalunit}`,
            kokonaissumma: `${record.total} ${record.pricefeetotalunit}`,
            operation: record.side,
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
                date: new Date(record.createdat),
                price: Number(record.price),
                amount: Number(record.size),
                type: record.side as "BUY" | "SELL",
                transactionFee: Number(record.fee),
            }
        })
}

export {
    parseCoinbaseCSV,
    parseDegiroCSV,
    parseNordnetCSV,
    getDegiroAsColumns,
    getCoinbaseAsColumns,
    prepareCoinbaseForFIFO,
    parseCoinbaseProCSV,
    getCoinbaseProAsColumns,
    prepareCoinbaseProForFIFO,
    getNordnetAsColumns,
    prepareNordnetForFIFO,
    prepareDegiroForFIFO,
    getDataDegiro,
    getDataNordnet,
    getDataCoinbase,
    getDataCoinbasePro,
}

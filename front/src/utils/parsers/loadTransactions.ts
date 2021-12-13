import { parse } from 'csv-parse/dist/esm/sync'
import translateDegiro from './translations.js'
import moment from 'moment';
import { Operation } from '../fifo/types'
import { DegiroHeaders, CoinbaseHeaders, NordnetHeaders } from './types'
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
        } as ColumnDataCrypto
    })
    return ret
}

export { parseCoinbaseCSV, parseDegiroCSV, parseNordNetCSV, getDegiroAsColumns, getCoinbaseAsColumns }
//parseCoinbaseCSV(inputCoinbase)
//parseDegiroCSV(input)
//parseNordNetCSV(inputNordNet)
//console.log(parseDegiroCSV(input))
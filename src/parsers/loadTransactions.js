import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import translateDegiro from './translations.js'
import moment from 'moment';

const input = fs.readFileSync('./files/transactions.csv', 'utf8').trim()
const parseDegiroCSV = (input) => {
    let prevField = ""
    const tmp = parse(input, {
        cast: (value, context) => {
            if (context.header) {
                if (value === '') return translateDegiro(`${prevField}-valuutta`);
                prevField = value
                return translateDegiro(value)
            }
            if (context.column === 'marketValue' ||
                context.column === 'transactionCosts' ||
                context.column === 'totalAmount' ||
                context.column === 'rate' ||
                context.column === 'quantity' ||
                context.column === 'value' ||
                context.column === 'exchangeRate') return Number(value)
            return String(value)
        },
        columns: true,
        trim: true,
    });
    
    const records = tmp.map(transaction => {
        transaction['datetime'] = moment(`${transaction.date}-${transaction.time}`, "DD-MM-YYYY-HH-mm").toDate()
        return transaction
    })
    console.log(records)
}
const inputNordNet = fs.readFileSync('./files/transactions-and-notes-export2.csv', 'utf16le')
const parseNordNetCSV = (input) => {
    const tmp = parse(input, {
        delimiter: ["\t"],
        columns: true,
        trim: true,
        cast: (value, context) => {
            if (context.column === 'Määrä' ||
                context.column === 'Kurssi' ||
                context.column === 'Välityspalkkio' ||
                context.column === 'Summa' ||
                context.column === 'Kokonaiskulut' ||
                context.column === 'Kokonaismäärä') return Number.parseFloat(value.replace(/,/g, '.'));
            if (context.column === 'Kirjauspäivä' ||
                context.column === 'Kauppapäivä' ||
                context.column === 'Maksupäivä' ) return moment(value, "YYYY-MM-DD").toDate()
            return String(value)
        },  
    });
    console.log(tmp)
}
const inputCoinbase = fs.readFileSync('./files/coinbase.csv', 'utf-8')
const parseCoinbaseCSV= (input) => {
    const tmp = parse(input, {
        cast: (value, context) => {
            if (context.column === 'Quantity Transacted' ||
                context.column === 'Spot Price at Transaction' ||
                context.column === 'Subtotal' ||
                context.column === 'Total (inclusive of fees)' ||
                context.column === 'Fees') return Number(value);
            if (context.column === 'Timestamp') return moment(value, "YYYY-MM-DD-HH-mm").toDate()
            return String(value)
        }, 
        columns: true,
        from_line: 8,
        trim: true, 
    });
    console.log(tmp)
}
//parseCoinbaseCSV(inputCoinbase)
//parseDegiroCSV(input)
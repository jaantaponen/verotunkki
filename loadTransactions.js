import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import translateDegiro from './translations.js'
import moment from 'moment';

const input = fs.readFileSync('./transactions.csv', 'utf8').trim()
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
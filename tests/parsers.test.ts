import fs from 'fs';
import path from 'path';
const relativePath = path.relative(process.cwd(), './tests/files');
import { CoinbaseHeaders } from '../src/utils/parsers/types'
import moment from 'moment';
import { getCoinbaseAsColumns, getCoinbaseProAsColumns, parseCoinbaseCSV, prepareCoinbaseForFIFO } from '../src/utils/parsers/loadTransactions'
import _ from 'lodash'

describe('Coinbase', () => {
    beforeEach(() => {

    });

    it('parses the received CSV file into json', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        expect(res).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbase.json`, 'utf-8')))
        )
    })

    it('columns are formatted correctly', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const columns = getCoinbaseAsColumns(res)
        expect(columns).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseColumns.json`, 'utf-8')))
        )
    })

    it('rawdata is processed correctly for FIFO operation', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbaseWithConverts.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = prepareCoinbaseForFIFO(res)
        expect(unprocessedFIFO).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseWithConverts.json`, 'utf-8')))
        )
    })
});

export { }
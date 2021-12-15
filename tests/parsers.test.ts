import fs from 'fs';
import path from 'path';
const relativePath = path.relative(process.cwd(), './tests/files');
import { CoinbaseHeaders } from '../src/utils/parsers/types'
import { getCoinbaseAsColumns, getCoinbaseProAsColumns, parseCoinbaseCSV, prepareCoinbaseForFIFO } from '../src/utils/parsers/loadTransactions'
import _ from 'lodash'
import { calculateFIFOTransactions } from '../src/utils/fifo';

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

    it('formats columns correctly', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const columns = getCoinbaseAsColumns(res)
        expect(columns).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseColumns.json`, 'utf-8')))
        )
    })

    it('processes rawdata correctly for FIFO operation', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbaseWithConverts.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = prepareCoinbaseForFIFO(res)
        expect(unprocessedFIFO).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseWithConverts.json`, 'utf-8')))
        )
    })

    it('throws an error when invalid data is parsed', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbasePro.csv`, 'utf-8')
        await expect(parseCoinbaseCSV(inputCoinbase)).rejects.toThrowError(TypeError);
        await expect(parseCoinbaseCSV("test123")).rejects.toThrowError(TypeError);
        await expect(parseCoinbaseCSV(undefined)).rejects.toThrowError("Invalid argument: got undefined at index 0");
        await expect(parseCoinbaseCSV({ "foo": "bar" } as any)).rejects.toThrowError(Error);
    })

    it('outputs column data even when source is invalid for user preview', async () => {
        expect(getCoinbaseAsColumns([{
            "Timestamp": "2021-05-10T05:14:00.000Z",
            "TransactionType": "BUY",
            "Asset": "ETH",
            "QuantityTransacted": "0.0008909",
            "SpotPriceCurrency": undefined,
            "SpotPriceatTransaction": undefined,
            "Subtotal": undefined,
            "Total": undefined,
            "Fees": undefined,
            "Notes": new Date(),
            "Source": "Coinbase"
        } as any,])).toEqual([
            {
                paivays: '2021-05-10T05:14:00.000Z',
                tuote: 'ETH',
                arvo: 'NaN undefined',
                maara: '0.0008909',
                kulut: '0.00 undefined',
                kurssi: 'undefined undefined',
                kokonaissumma: '0.00 undefined',
                operaatio: 'BUY'
            }
        ])
    })
    it('processes rawdata and executes FIFO', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = prepareCoinbaseForFIFO(res)
        expect(calculateFIFOTransactions(unprocessedFIFO)).toEqual([
            {
                ticker: 'ETH',
                buydate: '2021-05-10T05:14:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.0008909,
                transferPrice: 2784.01,
                profitOrLoss: -0.5297291399999999,
                acquisitionPrice: 3378.61,
                acquisitionFee: 0.99,
                transferFee: 0.0369599429825673
            },
            {
                ticker: 'ETH',
                buydate: '2021-05-22T12:13:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.05598209,
                transferPrice: 2784.01,
                profitOrLoss: 49.827978846300006,
                acquisitionPrice: 1893.94,
                acquisitionFee: 0,
                transferFee: 2.3224771067964425
            },
            {
                ticker: 'ETH',
                buydate: '2021-05-28T06:36:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.14882114,
                transferPrice: 2784.01,
                profitOrLoss: 113.11299566840002,
                acquisitionPrice: 2023.95,
                acquisitionFee: 0,
                transferFee: 6.174004769335127
            },
            {
                ticker: 'ETH',
                buydate: '2021-06-10T05:35:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.10075589,
                transferPrice: 2784.01,
                profitOrLoss: 70.58453873950002,
                acquisitionPrice: 2083.46,
                acquisitionFee: 0,
                transferFee: 4.179966269567654
            },
            {
                ticker: 'ETH',
                buydate: '2021-07-01T05:55:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.10072289,
                transferPrice: 2784.01,
                profitOrLoss: 101.06232613930001,
                acquisitionPrice: 1780.64,
                acquisitionFee: 0,
                transferFee: 4.178597229138396
            },
            {
                ticker: 'ETH',
                buydate: '2021-07-20T05:28:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.1000584,
                transferPrice: 2784.01,
                profitOrLoss: 129.09434709600004,
                acquisitionPrice: 1493.82,
                acquisitionFee: 0,
                transferFee: 4.1510301480827385
            },
            {
                ticker: 'ETH',
                buydate: '2021-08-09T10:16:00.000Z',
                selldate: '2021-08-21T11:15:00.000Z',
                amountsold: 0.10044249,
                transferPrice: 2784.01,
                profitOrLoss: 13.1559573402,
                acquisitionPrice: 2653.03,
                acquisitionFee: 0,
                transferFee: 4.166964534097077
            }
        ])
    })

    it('processes data with more sells than buys and executes FIFO with exception', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbaseWithConverts.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = prepareCoinbaseForFIFO(res)
        expect(() => calculateFIFOTransactions(unprocessedFIFO))
            .toThrow("Amount of sales for symbol LRC exceeds the amount of buys by 28.00000001. In transaction made in 2021-11-18T13:24:00.000Z")
    })
});

export { }
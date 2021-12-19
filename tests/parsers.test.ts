import fs from 'fs';
import path from 'path';
const relativePath = path.relative(process.cwd(), './tests/files');
import { getCoinbaseAsColumns, getDataCoinbase, getDataCoinbasePro, parseCoinbaseCSV, parseCoinbaseProCSV, parseDegiroCSV, parseNordnetCSV, prepareCoinbaseForFIFO, prepareDegiroForFIFO } from '../src/utils/parsers/loadTransactions'
import _ from 'lodash'
import { calculateFIFOTransactions } from '../src/utils/fifo';
import { rawDatas, resultFromParse } from '../src/components/PreviewData';
import { ColumnDataCrypto, ColumnDataSecurity } from '../src/components/tableSettings';
import { parseColumnDataToFIFO } from '../src/utils/parsers/helpers';

/* jest.mock('nanoid/async', () => Promise.resolve("aaa"));
 */
jest.mock('nanoid/async', () => ({ nanoid: async () => "1234" }))

describe('Coinbase', () => {
    beforeEach(() => {

    });

    it('parses the received CSV file into json', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = JSON.stringify(await parseCoinbaseCSV(inputCoinbase))
        expect(JSON.parse(res)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbase.json`, 'utf-8')))
        )
    })

    it('formats columns correctly', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const columns = JSON.stringify(getCoinbaseAsColumns(res))
        expect(JSON.parse(columns)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseColumns.json`, 'utf-8')))
        )
    })

    it('processes rawdata correctly for FIFO operation', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbaseWithConverts.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = JSON.stringify(prepareCoinbaseForFIFO(res))
        expect(JSON.parse(unprocessedFIFO)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbaseWithConverts.json`, 'utf-8')))
        )
    })

    it('throws an error when invalid data is parsed', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbasePro.csv`, 'utf-8')
        await expect(parseCoinbaseCSV(inputCoinbase)).rejects.toThrowError(TypeError);
        await expect(parseCoinbaseCSV("test123")).rejects.toThrowError(TypeError);
        await expect(parseCoinbaseCSV(undefined)).rejects.toThrowError("All headers not found in the provided Coinbase file.");
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
                paivays: "2021-05-10T05:14:00.000Z",
                tuote: 'ETH',
                id: undefined,
                arvo: 'NaN undefined',
                maara: 0.0008909,
                kulut: '0 undefined',
                kurssi: 'undefined undefined',
                kokonaissumma: '0 undefined',
                operation: 'BUY'
            }
        ])
    })

    it('processes data with more sells than buys and executes FIFO with exception', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbaseWithConverts.csv`, 'utf-8')
        const res = await parseCoinbaseCSV(inputCoinbase)
        const unprocessedFIFO = prepareCoinbaseForFIFO(res)
        expect(() => calculateFIFOTransactions(unprocessedFIFO))
            .toThrow("Amount of sales for ticker LRC exceeds the amount of buys by 28.00000000999999. In transaction made in 18/11/2021, 13:24:55")
    })
});

describe('CoinbasePro', () => {
    beforeEach(() => {
    });
    it('parses the received CSV file into json', async () => {
        const inputCoinbasePro = fs.readFileSync(`${relativePath}/coinbasePro.csv`, 'utf-8')
        const res = JSON.stringify(await parseCoinbaseProCSV(inputCoinbasePro))
        expect(JSON.parse(res)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/coinbasePro.json`, 'utf-8')))
        )
    })

    it('throws an error when invalid data is parsed', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/coinbase.csv`, 'utf-8')
        await expect(parseCoinbaseProCSV(inputCoinbase)).rejects.toThrowError(Error);
        await expect(parseCoinbaseProCSV("test123")).rejects.toThrowError(Error);
        await expect(parseCoinbaseProCSV(undefined)).rejects.toThrowError("All headers not found in the provided Coinbase Pro file.");
        await expect(parseCoinbaseProCSV({ "foo": "bar" } as any)).rejects.toThrowError(Error);
    })
});

describe('Degiro', () => {
    beforeEach(() => {
    });
    it('parses the received CSV file into json', async () => {
        const inputDegiro = fs.readFileSync(`${relativePath}/transactionsDegiro.csv`, 'utf-8')
        const res = JSON.stringify(await parseDegiroCSV(inputDegiro))
        expect(JSON.parse(res)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/transactionsDegiro.json`, 'utf-8')))
        )
    })

    it('correctly calculates fifo without seconds info', async () => {
        const inputDegiro = fs.readFileSync(`${relativePath}/transactionWithoutSecondsDegiro.csv`, 'utf-8')
        const res = (await parseDegiroCSV(inputDegiro))
        const fifoRaw = prepareDegiroForFIFO(res)
        expect(calculateFIFOTransactions(fifoRaw)).toEqual([
            {
                ticker: 'GAMESTOP CORPORATION C',
                buydate: '2021-02-01T22:00:00.000Z',
                selldate: '2021-02-01T22:00:00.000Z',
                amountsold: -3,
                transferPrice: '194.5000',
                profitOrLoss: -313.5,
                acquisitionPrice: '90.0000',
                acquisitionFee: 0.51,
                transferFee: 0.51
            }
        ])
    })

    it('throws an error when invalid data is parsed', async () => {
        const badInputDegiro = fs.readFileSync(`${relativePath}/transactionsNordnet.csv`, 'utf-8')
        await expect(parseDegiroCSV(badInputDegiro)).rejects.toThrowError(Error);
        await expect(parseDegiroCSV("test123")).rejects.toThrowError(TypeError);
        await expect(parseDegiroCSV(undefined)).rejects.toThrowError("All headers not found in the provided Degiro file.");
        await expect(parseDegiroCSV({ "foo": "bar" } as any)).rejects.toThrowError(Error);
    })
});

describe('Nordnet', () => {
    beforeEach(() => {
    });
    it('parses the received CSV file into json', async () => {
        const inputNordnet = fs.readFileSync(`${relativePath}/transactionsNordnet.csv`, 'utf16le').trim()
        const res = JSON.stringify(await parseNordnetCSV(inputNordnet))
        expect(JSON.parse(res)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/transactionsNordnet.json`, 'utf-8')))
        )
    })
    it('throws an error when invalid data is parsed', async () => {
        const badInputNordnet = fs.readFileSync(`${relativePath}/transactionsDegiro.csv`, 'utf-8')
        await expect(parseNordnetCSV(badInputNordnet)).rejects.toThrowError(Error);
        await expect(parseNordnetCSV("test123")).rejects.toThrowError(TypeError);
        await expect(parseNordnetCSV(undefined)).rejects.toThrowError("All headers not found in the provided Nordnet file.");
        await expect(parseNordnetCSV({ "foo": "bar" } as any)).rejects.toThrowError(Error);
    })
});


describe('FromCSV To FIFO result', () => {
    it('parses the CSVs to preFIFO succesfully', async () => {
        const inputCoinbase = fs.readFileSync(`${relativePath}/SortIssuedCoinbase.csv`, 'utf-8')
        const inputCoinbasePro = fs.readFileSync(`${relativePath}/SortIssuedCoinbasePro.csv`, 'utf-8')
        const coinbaseAsColumn = await getDataCoinbase(inputCoinbase) as resultFromParse
        const coinbaseProAsColumns = await getDataCoinbasePro(inputCoinbasePro) as resultFromParse

        const data = [coinbaseAsColumn, coinbaseProAsColumns]

        const newRows = data.filter(result => result.rows)
        const combinedRowData = [...newRows.map(x => x.rows).concat([] as any)].flatMap(x => x) as ColumnDataSecurity[] | ColumnDataCrypto[]
        const newRawData = Object.assign({}, ...data.map(result => result.orig)) as rawDatas


        const tmp = JSON.stringify(combinedRowData)
        const tmp2 = JSON.stringify(newRawData)

        expect(JSON.parse(tmp)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/sortIssueRow.json`, 'utf-8')))
        )

        expect(JSON.parse(tmp2)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/sortIssueRaw.json`, 'utf-8')))
        )
    })
});



export { }
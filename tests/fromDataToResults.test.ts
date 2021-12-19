import fs from 'fs';
import path from 'path';
const relativePath = path.relative(process.cwd(), './tests/files');
import { getCoinbaseAsColumns, getDataCoinbase, getDataCoinbasePro, parseCoinbaseCSV, parseCoinbaseProCSV, parseDegiroCSV, parseNordnetCSV, prepareCoinbaseForFIFO, prepareDegiroForFIFO } from '../src/utils/parsers/loadTransactions'
import _ from 'lodash'
import { calculateFIFOTransactions } from '../src/utils/fifo';
import { rawDatas, resultFromParse } from '../src/components/PreviewData';
import { ColumnDataCrypto, ColumnDataSecurity } from '../src/components/tableSettings';
import { parseColumnDataToFIFO } from '../src/utils/parsers/helpers';

describe('to FIFO without jest mock', () => {
    it('from raw data ', async () => {
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
        const fifoPre = parseColumnDataToFIFO(JSON.parse(tmp), JSON.parse(tmp2))
        const fifoed = JSON.stringify(calculateFIFOTransactions(fifoPre))
        expect(JSON.parse(fifoed)).toEqual(
            (JSON.parse(fs.readFileSync(`${relativePath}/fifoJSONFull.json`, 'utf-8')))
        )
    })
});

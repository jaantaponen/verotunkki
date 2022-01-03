import _ from "lodash";
import { nanoid } from "nanoid";
import { FileObject } from "react-mui-dropzone";
import { rawDatas, resultFromParse } from "../../components/PreviewData";
import { ColumnDataCrypto, ColumnDataSecurity } from "../../components/tableSettings";
import { Operation } from "../fifo";
import { getCoinbaseAsColumns } from "./loadTransactions";
import { CoinbaseHeaders } from "./types";

/**
 * Workaround for browsers.
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
const b64_to_utf8 = (str: string) => (decodeURIComponent(escape(window.atob(str))))

const decodeUTF16LE = (binaryStr: string) => {
    const cp = [];
    for (let i = 0; i < binaryStr.length; i += 2)
        cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
    return String.fromCharCode(...cp);
}

/**
 * Gets the current file and checks it againts parsers.
 * @param filesCopy 
 * @returns headers
 */
const chooseCSVParser = async (filesCopy: FileObject[], parsers: any[]): Promise<resultFromParse[]> => {
    const a = await Promise.all(filesCopy.map(async file => {
        return await Promise.all(parsers.map(async parser => {
            const fileName = file.file.name
            try {
                const inputFile = file.data ? file.data.toString().split(',')[1] : ""
                const fileContentBuffer = parser.name === 'getDataNordnet' ? decodeUTF16LE(atob(inputFile)) : b64_to_utf8(inputFile)
                const fileContent = fileContentBuffer.toString()
                const parsedData = await parser(fileContent)
                parsedData.fileName = fileName
                return parsedData
            } catch (e: any) {
                return { Error: e, fileName: fileName }
            }
        }))
    })) as resultFromParse[]
    return a.flatMap(x => x)
}

/**
 * Due to Jest (26.x.x) being the latest stable release, we have to default to commonjs module for tests.
 * The ESM module support through Babel was not sufficient and resulted in different behaviour. 
 * @returns parse function
 */
const loadParser: any = async () => (process.env.NODE_ENV === 'test' ?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore  
    (await import('csv/dist/cjs/sync.cjs')).parse :
    (await import('csv/dist/esm/sync')).parse
)


const parseColumnDataToFIFO = (rawDataAsColumns: ColumnDataSecurity[] | ColumnDataCrypto[], originalData: rawDatas): Operation[] => {
    const coinBaseIssueRows = rawDataAsColumns.filter(customOp => (customOp.operation === 'CONVERT' ||
        customOp.operation === 'COINBASE EARN' ||
        customOp.operation === 'RECEIVE') &&
        originalData['Coinbase'].map(x => x.id).includes(customOp.id)) as ColumnDataCrypto[]

    const coinbaseTMP: CoinbaseHeaders[] = []
    coinBaseIssueRows.forEach(issueRow => {
        const matchinOrigData = originalData['Coinbase']?.find(x => x.id === issueRow.id)
        if (matchinOrigData?.TransactionType === 'CONVERT') {
            const info = matchinOrigData.Notes.split(' ')
            //const soldAmount = info[1]
            //const soldCurrency = info[2]
            const boughAmount = Number(info[4])
            const boughtCurrency = info[5]
            coinbaseTMP.push({
                ...matchinOrigData,
                TransactionType: "SELL",
                id: nanoid(10),
                Fees: 0,
                Total: matchinOrigData.Total - matchinOrigData.Fees
            })
            coinbaseTMP.push({
                ...matchinOrigData,
                TransactionType: "BUY",
                id: nanoid(10),
                Asset: boughtCurrency,
                QuantityTransacted: boughAmount,
                SpotPriceatTransaction: matchinOrigData.Subtotal / boughAmount
            })
        } else if (matchinOrigData?.TransactionType === 'COINBASE EARN') {
            coinbaseTMP.push({
                ...matchinOrigData,
                TransactionType: "BUY",
            })
        } else if (matchinOrigData?.TransactionType === 'RECEIVE') {
            coinbaseTMP.push({
                ...matchinOrigData,
                TransactionType: "BUY",
            })
        }
    })

    const correctedCoinbaseData = getCoinbaseAsColumns(coinbaseTMP)
    // We do not need filter by unique since other operations than BUY and SELL are filtered below.
    const combined = rawDataAsColumns.concat(correctedCoinbaseData ? correctedCoinbaseData as any : [])
/*     const combinedNordnet = combined.map(x => ({
        ...x,
        operation: x.operation === 'OSTO' ? 'BUY': 'SELL'
    })) */
    const fifoData = combined
        .filter(type => type.operation === 'BUY' || type.operation === 'SELL')
        .map(transaction => {
            return {
                symbol: transaction.tuote,
                date: transaction.paivays,
                price: Math.abs(Number(transaction.kurssi.split(' ')[0])),
                amount: Math.abs((transaction.maara)),
                type: transaction.operation as "BUY" | "SELL",
                transactionFee: Math.abs(Number(transaction.kulut.split(' ')[0])),
            }
        })
    return fifoData as Operation[]
}



export { chooseCSVParser, loadParser, parseColumnDataToFIFO }
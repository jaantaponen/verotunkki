import { SetStateAction, useEffect, useState } from 'react'
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, createTheme, Stack, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { getCoinbaseAsColumns, getCoinbaseProAsColumns, getDataCoinbase, getDataCoinbasePro, getDataDegiro, getDataNordnet, getDegiroAsColumns, getNordnetAsColumns, parseCoinbaseCSV, parseCoinbaseProCSV, parseDegiroCSV, parseNordnetCSV, prepareCoinbaseForFIFO, prepareCoinbaseProForFIFO, prepareDegiroForFIFO, prepareNordnetForFIFO } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders, CoinbaseProHeaders, DegiroHeaders, NordnetHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import { ResultCard } from './ResultCard'
import { ColumnDataCrypto, ColumnDataSecurity, ColumnDataTransaction, columnsCrypto, columnsSecurity } from './tableSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { calculateFIFOTransactions } from '../utils/fifo'
import { Operation, Transaction } from '../utils/fifo/types'
import { chooseCSVParser } from '../utils/parsers/helpers'
import axios from 'axios';
import moment from 'moment';
import { PreviewTable } from './PreviewTable'
import { nanoid } from 'nanoid'

const parsersCrypto = [getDataCoinbase, getDataCoinbasePro]
const parsersSecurity = [getDataDegiro, getDataNordnet]

export interface rawDatas {
    Coinbase: CoinbaseHeaders[]
    CoinbasePro: CoinbaseProHeaders[]
    Degiro: DegiroHeaders[]
    Nordnet: NordnetHeaders[]
}

interface calculatedResultsType {
    capitalGains: number,
    capitalLosses: number,
    transactionTotal: number,
    netProfit: number
}

export interface resultFromParse {
    orig: rawDatas
    rows: ColumnDataSecurity[] | ColumnDataCrypto[]
}

interface Props {
    mode: "CRYPTO" | "SECURITY"
}

const PreviewData = ({ mode }: Props) => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)

    const [rowDataColumn, setRowDataColumn] = useState<ColumnDataSecurity[] | ColumnDataCrypto[]>([] as any[]);
    const [rawDataAsColumns, setRawDataAsColumns] = useState<ColumnDataSecurity[] | ColumnDataCrypto[]>([] as any[]);
    const [originalData, setOriginalData] = useState<rawDatas>({} as rawDatas);
    const rawDataSetCallback = (newRawData: ColumnDataSecurity[] | ColumnDataCrypto[]) => setRawDataAsColumns(newRawData)

    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [parseError, setParseError] = useState("")
    const [errorFifo, setErrorFifo] = useState("")
    const [showCurrencyFetchButton, setShowCurrencyFetchButton] = useState(false)
    const [calculatedResults, setCalculatedResults] = useState({} as calculatedResultsType);

    const fileCallback = (file: FileObject[]) => setFiles([...files, ...file])

    const clearRows = () => {
        setFiles([])
        setRowDataColumn([])
        setRawDataAsColumns([])
        setOriginalData({} as any)
        setShowTable(false)
        setZoneHeight(400)
        setResults([])
    }

    const calculateFIFO = () => {
        try {
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
                        id: nanoid(10),
                        TransactionType: "BUY",
                    })
                } else if (matchinOrigData?.TransactionType === 'RECEIVE') {
                    coinbaseTMP.push({
                        ...matchinOrigData,
                        id: nanoid(10),
                        TransactionType: "BUY",
                    })
                }
            })

            const correctedCoinbaseData = getCoinbaseAsColumns(coinbaseTMP)
            // We do not need filter by unique since other operations than BUY and SELL are filtered below.
            const combined = rawDataAsColumns.concat(correctedCoinbaseData ? correctedCoinbaseData as any : [])

            // Replace IDs
            const arrReplacedObj = combined.map(item => {
                const obj = correctedCoinbaseData.find(newObj => newObj.id === item.id)
                return obj ? obj : item
            }) as ColumnDataSecurity[] | ColumnDataCrypto[]

            /**
             * In this function we need to get the 1values with the string.split function.
             * Since some columns are formattes as value & currency (Ex. 10 EUR).
             */
            const fifoData = arrReplacedObj
                .filter(type => type.operation === 'BUY' || type.operation === 'SELL')
                .map(transaction => {
                    return {
                        symbol: transaction.tuote,
                        date: new Date(transaction.paivays),
                        price: Math.abs(Number(transaction.kurssi.split(' ')[0])),
                        amount: Math.abs((transaction.maara)),
                        type: transaction.operation as "BUY" | "SELL",
                        transactionFee: Math.abs(Number(transaction.kulut.split(' ')[0])),
                    }
                })
            console.log(fifoData)
            const finalFifo = calculateFIFOTransactions(fifoData)
            setResults(finalFifo.map((x, idx) => ({
                ...x,
                buydate: new Date(x.buydate),
                selldate: new Date(x.selldate),
                transferFee: `${Number(x.transferFee)} EUR`,
                profitOrLoss: `${Number(x.profitOrLoss)} EUR`,
                id: idx
            })))

            setCalculatedResults({
                capitalGains: _.sumBy(finalFifo, (o) => o.profitOrLoss > 0 ? o.profitOrLoss : 0),
                capitalLosses: _.sumBy(finalFifo, (o) => o.profitOrLoss < 0 ? o.profitOrLoss : 0),
                transactionTotal: _.sumBy(finalFifo, (o) => Math.abs(o.transferFee) + Math.abs(o.acquisitionFee)),
                netProfit: _.sumBy(finalFifo, (o) => o.profitOrLoss - (Math.abs(o.transferFee) + Math.abs(o.acquisitionFee)))
            })

        } catch (e: any) {
            setErrorFifo(e.message)
        }
    }

    const currencyClick = () => {
        (async () => {
            const additionlOperationTobeAdded = [] as any[]
            const arrReplacedObj = await Promise.all(rawDataAsColumns.map(async item => {
                const fixedCurrencies = [] as any[]
                if ((item.operation === 'BUY' || item.operation === 'SELL') && item.kokonaissumma.split(' ')[1] !== "EUR") {
                    const requestDate = moment(item.paivays).format('YYYY-MM-DD');
                    const unitAsEur = (await (await axios.get(`https://api.coinbase.com/v2/prices/${item.tuote}-EUR/spot?date=${requestDate}`)).data.data)?.amount
                    const percentageOfFee = Number(item.kulut.split(' ')[0]) / Number(item.kokonaissumma.split(' ')[0])
                    const totalInEur = unitAsEur * item.maara
                    const totalFee = totalInEur * percentageOfFee

                    // Handle sell
                    fixedCurrencies.push({
                        ...item,
                        kurssi: `${unitAsEur} EUR`,
                        kulut: `${totalFee} EUR`,
                        kokonaissumma: `${totalInEur - totalFee} EUR`,
                    })
                    /**
                     * Need to handle Coinbase Pro incorrect currencies as SELL, BUY instead of just sell
                     * SInce most of the entries are just from converting Currency x via uniswap (for example UNI to BTC )
                     */
                    if (originalData['CoinbasePro']?.find(y => y.id === item.id)) {
                        additionlOperationTobeAdded.push({
                            ...item,
                            operation: "BUY",
                            id: nanoid(10),
                            tuote: `${item.arvo.split(' ')[1]}`,
                            kurssi: `${unitAsEur} EUR`,
                            kulut: `${totalFee} EUR`,
                            kokonaissumma: `${totalInEur - totalFee} EUR`,
                        })
                    }
                }
                const obj = fixedCurrencies.find(newObj => newObj.id === item.id)
                return obj ? obj : item
            }))
            setRawDataAsColumns([...arrReplacedObj.concat(additionlOperationTobeAdded)])
            setRowDataColumn([...arrReplacedObj.concat(additionlOperationTobeAdded)])
            setShowCurrencyFetchButton(false)
            setParseError("")
        })()
    }


    useEffect(() => {
        (async () => {
            if (files.length > 0) {
                const data = (await chooseCSVParser(files, mode === "CRYPTO" ? parsersCrypto : parsersSecurity)) as resultFromParse

                if ((data as any)[0]?.Error) {
                    const msg = (data as any)[0].Error.message
                    if (msg.toString().includes('All headers not found')) {
                        setParseError(`${msg} Are you tryin to parse in the wrong site?`)
                    } else if (msg === "malformed URI sequence") {
                        setParseError("Unable to parse file, is it encoded in a weird format?")
                    } else {
                        setParseError(msg)
                    }
                } else {
                    const original = data.orig as rawDatas
                    const rawKeys = (Object.keys(original) as Array<keyof typeof original>)
                    const key = rawKeys[0]
                    const dataSource = original[key]
                    setRowDataColumn([...rowDataColumn.concat(data.rows as any)])
                    setRawDataAsColumns([...rowDataColumn.concat(data.rows as any)])
                    setOriginalData({
                        ...originalData,
                        [key]: dataSource
                    })
                    setShowTable(true)
                }

                setFiles([])
            }
        })()
    }, [files])

    useEffect(() => {
        console.log("rowdataa", rowDataColumn)
        const enableCurrencyWarning = rowDataColumn
            .filter(invalid => invalid?.kokonaissumma?.split(' ')[1] !== 'EUR'
                && (invalid.operation === 'BUY'
                    || invalid.operation === 'SELL'))
        setShowCurrencyFetchButton(enableCurrencyWarning.length > 0 && rowDataColumn.length > 0)
    }, [rowDataColumn])

    useEffect(() => {
        //console.log("oring update", originalData)
    }, [originalData])


    useEffect(() => {
        if (parseError.includes("In trancactions made in")) {
            setShowCurrencyFetchButton(true)
        }
    }, [parseError])


    const theme = createTheme({
        typography: {
            fontSize: 14,
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container component="main" sx={{ pt: 8, pb: 4 }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    width="sm"

                >
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold', pt: 8 }}
                    >
                        VEROTUNKKI
                    </Typography>
                    <Typography alignSelf="center" align="center" variant="h6" sx={{ pt: 0 }} component="p">
                        {mode === 'CRYPTO' ? "Virtuaalivaluutat" : "Arvopaperit"}
                    </Typography>
                    {parseError && <Alert severity="error">{parseError}</Alert>}
                    {results.length === 0 && <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />}
                    {results.length > 0 &&
                        <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ pb: 4 }}>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <ResultCard header="Gross Capital Gain"
                                    content={calculatedResults.capitalGains.toFixed(2)}
                                    footer="Gains" footerSecondary="before losses and fees"
                                    contentColor="success.light"
                                />
                                <ResultCard header="Gross Capital Loss"
                                    content={calculatedResults.capitalLosses.toFixed(2)}
                                    footer="Losses"
                                    footerSecondary="before gains and fees"
                                    contentColor="error.light"
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <ResultCard header="Transaction Fees"
                                    content={calculatedResults.transactionTotal.toFixed(2)}
                                    footer="Fees" footerSecondary="acquisition and transfer Fees"
                                    contentColor="error.light"
                                />
                                <ResultCard header="Net Capital Gain"
                                    content={calculatedResults.netProfit.toFixed(2)}
                                    footer="Total"
                                    footerSecondary="Gains with fees and losses"
                                    contentColor={calculatedResults.netProfit > 0 ? 'success.light' : 'error.light'}
                                />
                            </Stack>
                        </Stack>}
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        {mode === 'CRYPTO' ? "Tuetut lähteet: Coinbase, Coinbase Pro" : "Tuetut lähteet: Nordnet, Degiro"}
                    </Typography>
                    {errorFifo && <Alert severity="error">{errorFifo}</Alert>}
                    {showCurrencyFetchButton && <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                        <Alert severity="warning" >
                            You have made transactions that have not been traded in EUR. Do you want to use an external API to fetch the currency info? EXPERIMENTAL!
                        </Alert>
                        <Button variant="contained" onClick={currencyClick} endIcon={<DownloadIcon />} >Fetch</Button>
                    </Stack>}

                    {showTable && !showCurrencyFetchButton && <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={clearRows} startIcon={<DeleteIcon />}>
                            Poistha
                        </Button>
                        <Button disabled={results.length > 0} onClick={calculateFIFO} variant="contained" endIcon={<SendIcon />}>
                            Laske
                        </Button>
                    </Stack>}

                    {(showTable && results.length === 0) && <div style={{ width: '100%' }}>
                        <PreviewTable rows={rowDataColumn} mode={mode} rawDataAsColumns={rawDataAsColumns} rawDatatSetCallback={rawDataSetCallback} />
                    </div>}
                    {results.length > 0 && <ResultTable rows={results} />}
                </Stack>
                {<Copyright />}
            </Container>
        </ThemeProvider >
    );
}

export { PreviewData }
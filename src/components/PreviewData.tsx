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


const parsersCrypto = [parseCoinbaseCSV, parseCoinbaseProCSV]
const parsersSecurity = [parseDegiroCSV, parseNordnetCSV]

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

interface Props {
    mode: "CRYPTO" | "SECURITY"
}

const PreviewData = ({ mode }: Props) => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)

    const [rows, setRows] = useState<ColumnDataCrypto[] | ColumnDataSecurity[]>([]);
    const [rawData, setRawData] = useState<rawDatas>({} as rawDatas);
    const rawDatatSetCallback = (newRawData: rawDatas) => setRawData(newRawData)
    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [parseError, setParseError] = useState("")
    const [errorFifo, setErrorFifo] = useState("")
    const [showCurrencyFetchButton, setShowCurrencyFetchButton] = useState(false)
    const [calculatedResults, setCalculatedResults] = useState({} as calculatedResultsType);
    const fileCallback = (file: FileObject[]) => setFiles([...files, ...file])
    const theme = createTheme({
        typography: {
            fontSize: 14,
        }
    });

    const clearRows = () => {
        setFiles([])
        setRows([])
        setShowTable(false)
        setZoneHeight(400)
        setResults([])
    }

    const calculateFIFO = () => {
        const fifoData: Operation[] = []
        try {
            if (rawData?.Coinbase) {
                fifoData.push(...prepareCoinbaseForFIFO(rawData.Coinbase as CoinbaseHeaders[]))
            }
            if (rawData?.CoinbasePro) {
                fifoData.push(...prepareCoinbaseProForFIFO(rawData.CoinbasePro as CoinbaseProHeaders[]))
            }
            if (rawData?.Degiro) {
                fifoData.push(...prepareDegiroForFIFO(rawData.Degiro as DegiroHeaders[]))
            }
            if (rawData?.Nordnet) {
                fifoData.push(...prepareNordnetForFIFO(rawData.Nordnet as NordnetHeaders[]))
            }
            const finalFifo = calculateFIFOTransactions(fifoData)
            setResults(finalFifo.map((x, idx) => ({
                ...x,
                buydate: new Date(x.buydate).toLocaleString('en-GB', { timeZone: 'UTC' }),
                selldate: new Date(x.selldate).toLocaleString('en-GB', { timeZone: 'UTC' }),
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

    const createColumnsFromRaw = (newRawData: rawDatas) => {

        const columnData = Object.keys(newRawData).map((header) => {
            if (header === 'Coinbase') {
                return getCoinbaseAsColumns(newRawData.Coinbase as CoinbaseHeaders[]) as ColumnDataCrypto[]
            } else if (header === 'CoinbasePro') {
                const currencyError = newRawData.CoinbasePro.find(x => x?.Error === "Invalid currency detected")
                if (currencyError)
                    setParseError(`${currencyError.Error} In trancactions made in ${currencyError
                        .createdat.toLocaleString('en-GB', { timeZone: 'UTC' })}.`)
                return getCoinbaseProAsColumns(newRawData.CoinbasePro as CoinbaseProHeaders[]) as ColumnDataCrypto[]
            } else if (header === 'Degiro') {
                return getDegiroAsColumns(newRawData.Degiro as DegiroHeaders[]) as ColumnDataSecurity[]
            } else if (header === 'Nordnet') {
                return getNordnetAsColumns(newRawData.Nordnet as NordnetHeaders[]) as ColumnDataSecurity[]
            } else {
                return []
            }
        })
        setRows((_.flatten(columnData)) as ColumnDataCrypto[] | ColumnDataSecurity[])
        setZoneHeight(200)
        setShowTable(true)
    }

    const currencyClick = () => {
        (async () => {
            const fixedCurrencies = await Promise.all(rawData.CoinbasePro.map(async x => {
                const requestDate = moment(x.createdat).format('YYYY-MM-DD');
                const unitAsEur = (await (await axios.get(`https://api.coinbase.com/v2/prices/${x.sizeunit}-EUR/spot?date=${requestDate}`)).data.data)?.amount
                const percentageOfFee = x.fee / x.total
                const totalInEur = unitAsEur * x.size
                const totalFee = totalInEur * percentageOfFee
                return {
                    ...x,
                    pricefeetotalunit: "EUR",
                    price: unitAsEur,
                    fee: totalFee,
                    total: totalInEur - totalFee,
                    Error: undefined
                }
            })) as CoinbaseProHeaders[]
            const newRawData = {
                ...rawData,
                CoinbasePro: fixedCurrencies
            }
            setRawData(newRawData)
            createColumnsFromRaw(newRawData)
            setShowCurrencyFetchButton(false)
            setParseError("")
        })()
    }

    useEffect(() => {
        (async () => {
            if (files.length > 0) {
                const data = await chooseCSVParser(files, mode === "CRYPTO" ? parsersCrypto : parsersSecurity)
                const dataSource = data[0]?.Source
                if (dataSource === 'Error') {
                    const msg = data[0]['Error'].message
                    if (msg === "malformed URI sequence") {
                        setParseError("Unable to parse file, is it encoded in a weird format?")
                    } else {
                        setParseError(data[0]['Error'].message)
                    }
                } else {
                    createColumnsFromRaw({
                        ...rawData,
                        [dataSource]: data
                    })
                    setRawData({
                        ...rawData,
                        [dataSource]: data
                    })
                }

                setFiles([])
            }
        })()
    }, [files])

    useEffect(() => {
        //console.log("rows update", rows)
    }, [rows])


    useEffect(() => {
        if (parseError.includes("In trancactions made in")) {
            setShowCurrencyFetchButton(true)
        }
    }, [parseError])

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
                        <PreviewTable rows={rows} mode={mode} rawData={rawData} rawDatatSetCallback={rawDatatSetCallback} />
                    </div>}
                    {results.length > 0 && <ResultTable rows={results} />}
                </Stack>
                {<Copyright />}
            </Container>
        </ThemeProvider >
    );
}

export { PreviewData }
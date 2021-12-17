import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { parseDegiroCSV, getDegiroAsColumns, parseCoinbaseProCSV, parseCoinbaseCSV, parseNordNetCSV, prepareCoinbaseForFIFO, getCoinbaseAsColumns, getCoinbaseProAsColumns, prepareCoinbaseProForFIFO, getNordnetAsColumns, prepareDegiroForFIFO, prepareNordnetForFIFO } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders, CoinbaseProHeaders, DegiroHeaders, NordnetHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import { ColumnDataCrypto, ColumnDataSecurity, ColumnDataTransaction, columnsCrypto } from './tableSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { calculateFIFOTransactions } from '../utils/fifo'
import { Operation, Transaction } from '../utils/fifo/types'
import { chooseCSVParser } from '../utils/parsers/helpers'

const parsersCrypto = [parseCoinbaseCSV, parseCoinbaseProCSV]
const parsersSecurity = [parseDegiroCSV, parseNordNetCSV]

interface rawDatas {
    Coinbase: CoinbaseHeaders[]
    CoinbasePro: CoinbaseProHeaders[]
    Degiro: DegiroHeaders[]
    Nordnet: NordnetHeaders[]
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
    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [parseError, setParseError] = useState("")
    const [errorFifo, setErrorFifo] = useState("")

    const [tmpResult, setTmpResult] = useState(0);

    const fileCallback = (file: FileObject[]) => setFiles([...files, ...file])
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
    });


    const clearRows = () => {
        setFiles([])
        setRows([])
        setRawData({} as rawDatas)
        setShowTable(false)
        setZoneHeight(400)
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


            console.log(fifoData.filter(x => x.symbol === 'LINK'))
            const finalFifo = calculateFIFOTransactions(fifoData)
            setResults(_.sortBy(finalFifo, (o) => o.selldate).map(x => ({
                ...x,
                buydate: new Date(x.buydate).toISOString().substring(0, 16),
                selldate: new Date(x.selldate).toISOString().substring(0, 16),
                transferFee: `${Number(x.transferFee).toFixed(4)} EUR`,
                profitOrLoss: `${x.profitOrLoss.toFixed(3)} EUR`,
            })))
            setTmpResult(_.sumBy(finalFifo, (o) => o.profitOrLoss))
        } catch (e: any) {
            setErrorFifo(e.message)
        }
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

                } else if (dataSource === 'Coinbase') {
                    const coinBaseColumns = getCoinbaseAsColumns(data as CoinbaseHeaders[])
                    const rawcopy = { ...rawData }
                    setRawData({
                        ...rawData,
                        Coinbase: [...(rawcopy?.Coinbase ? rawcopy.Coinbase : []), ...data]
                    })
                    setRows(_.sortBy([...rows as ColumnDataCrypto[], ...coinBaseColumns], (o) => o.paivays))
                    setZoneHeight(200)
                    setShowTable(true)
                } else if (dataSource === 'CoinbasePro') {
                    const currencyError = data.find((x: any) => x?.Error === "Invalid currency detected")
                    if (currencyError)
                        setParseError(`${currencyError.Error} In trancactions made in ${currencyError
                            .createdat.toLocaleString('en-GB', { timeZone: 'UTC' })}.`)

                    const coinBaseProColumns = getCoinbaseProAsColumns(data as CoinbaseProHeaders[])
                    const rawcopy = { ...rawData }
                    setRawData({
                        ...rawData,
                        CoinbasePro: [...(rawcopy?.CoinbasePro ? rawcopy.CoinbasePro : []), ...data]
                    })
                    setRows(_.sortBy([...rows as ColumnDataCrypto[], ...coinBaseProColumns], (o) => o.paivays))
                    setZoneHeight(200)
                    setShowTable(true)
                } else if (dataSource === 'Nordnet') {
                    const nordnetColumns = getNordnetAsColumns(data as NordnetHeaders[])
                    const rawcopy = { ...rawData }
                    setRawData({
                        ...rawData,
                        Nordnet: [...(rawcopy?.Nordnet ? rawcopy.Nordnet : []), ...data]
                    })
                    setRows(_.sortBy([...rows as ColumnDataSecurity[], ...nordnetColumns], (o) => o.paivays))
                    setZoneHeight(200)
                    setShowTable(true)
                } else if (dataSource === 'Degiro') {
                    const degiroColumns = getDegiroAsColumns(data as DegiroHeaders[])
                    const rawcopy = { ...rawData }
                    setRawData({
                        ...rawData,
                        Degiro: [...(rawcopy?.Nordnet ? rawcopy.Nordnet : []), ...data]
                    })
                    setRows(_.sortBy([...rows as ColumnDataSecurity[], ...degiroColumns], (o) => o.paivays))
                    setZoneHeight(200)
                    setShowTable(true)
                }
                setFiles([])

            }
        })()
    }, [files])

    useEffect(() => {
        console.log("rows parsed into rawdata", rawData)
    }, [rawData])


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
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        {mode === 'CRYPTO' ? "Tuetut lähteet: Coinbase, Coinbase Pro" : "Tuetut lähteet: Nordnet, Degiro"}
                    </Typography>
                    {errorFifo && <Alert severity="error">{errorFifo}</Alert>}
                    {showTable && <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={clearRows} startIcon={<DeleteIcon />}>
                            Poistha
                        </Button>
                        <Button disabled={results.length > 0} onClick={calculateFIFO} variant="contained" endIcon={<SendIcon />}>
                            Laske
                        </Button>
                    </Stack>}
                    {(showTable && results.length === 0) && <ResultTable mode={mode} rows={rows} />}
                    {results.length > 0 &&
                        <div>
                            <ResultTable mode="RESULT" rows={results} />
                            <p>Net Capital Gain: {tmpResult.toFixed(2)} EUR</p>
                        </div>}
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { PreviewData }
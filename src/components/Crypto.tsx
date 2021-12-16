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
import { parseDegiroCSV, getDegiroAsColumns, parseCoinbaseProCSV, parseCoinbaseCSV, parseNordNetCSV, prepareCoinbaseForFIFO, getCoinbaseAsColumns, getCoinbaseProAsColumns, prepareCoinbaseProForFIFO } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders, CoinbaseProHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import { ColumnDataCrypto, ColumnDataTransaction, columnsCrypto } from './tableSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { calculateFIFOTransactions } from '../utils/fifo'
import { Operation, Transaction } from '../utils/fifo/types'
import { chooseCSVParser } from '../utils/parsers/parseUtils'

const parsers = [parseCoinbaseCSV, parseCoinbaseProCSV]

const Crypto = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [rows, setRows] = useState<ColumnDataCrypto[]>([]);
    const [rawData, setRawData] = useState<CoinbaseHeaders[] | CoinbaseProHeaders[]>([]);
    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [dataSource, setDataSource] = useState<"Coinbase" | "CoinbasePro">();
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
        setRawData([])
        setShowTable(false)
    }

    const calculateFIFO = () => {
        console.log("nauraa")
        let fifoData: Transaction[] = []
        try {
            if (dataSource === 'Coinbase') {
                fifoData = calculateFIFOTransactions(prepareCoinbaseForFIFO(rawData as CoinbaseHeaders[]))
            } else if (dataSource === 'CoinbasePro') {
                fifoData = calculateFIFOTransactions(prepareCoinbaseProForFIFO(rawData as CoinbaseProHeaders[]))
            }
            setResults(_.sortBy(fifoData, (o) => o.selldate).map(x => ({
                ...x,
                buydate: x.buydate.toISOString().substring(0, 16),
                selldate: x.selldate.toISOString().substring(0, 16),
                transferFee: `${Number(x.transferFee).toFixed(4)} EUR`,
                profitOrLoss: `${x.profitOrLoss.toFixed(3)} EUR`,
            })))
            setTmpResult(_.sumBy(fifoData, (o) => o.profitOrLoss))
        } catch (e: any) {
            setErrorFifo(e.message)
        }

    }

    useEffect(() => {
        (async () => {
            if (files.length > 0) {
                const data = await chooseCSVParser(files, parsers)
                console.log(data)
                const dataSource = data[0]?.Source
                if (dataSource === 'Error') {
                    const msg = data[0]['Error'].message
                    if (msg === "malformed URI sequence") {
                        setParseError("Unable to parse file, is it encoded in a weird format?")
                    } else {
                        setParseError(data[0]['Error'].message)
                    }

                } else if (dataSource === 'Coinbase') {
                    setDataSource('Coinbase')
                    const coinBaseColumns = getCoinbaseAsColumns(data as CoinbaseHeaders[])
                    setRawData([...rawData, ...data] as CoinbaseHeaders[])
                    setRows([...rows, ...coinBaseColumns])
                    setZoneHeight(200)
                    setShowTable(true)
                } else if (dataSource === 'CoinbasePro') {
                    setDataSource('CoinbasePro')
                    const coinBaseProColumns = getCoinbaseProAsColumns(data as CoinbaseProHeaders[])
                    setRawData([...rawData, ...data] as CoinbaseProHeaders[])
                    setRows([...rows, ...coinBaseProColumns])
                    setZoneHeight(200)
                    setShowTable(true)
                }

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
                        Virtuaalivaluutat
                    </Typography>
                    {parseError && <Alert severity="error">{parseError}</Alert>}
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Coinbase, Coinbase Pro
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
                    {showTable && <ResultTable mode="Crypto" rows={rows} />}
                    {results.length > 0 &&
                        <div>
                            <ResultTable mode="Result" rows={results} />
                            <p>Total naurut: {tmpResult.toFixed(2)} EUR</p>
                        </div>}
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { Crypto }
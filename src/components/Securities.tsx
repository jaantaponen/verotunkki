import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { parseDegiroCSV, getDegiroAsColumns, parseNordNetCSV, getNordnetAsColumns, prepareDegiroForFIFO, prepareNordnetForFIFO } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders, CoinbaseProHeaders, DegiroHeaders, NordnetHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { ColumnDataSecurity, ColumnDataTransaction } from './tableSettings';
import { chooseCSVParser } from '../utils/parsers/helpers'
import _ from 'lodash';
import { calculateFIFOTransactions } from '../utils/fifo';
import { Transaction } from '../utils/fifo/types';
const parsers = [parseDegiroCSV, parseNordNetCSV]

const Securities = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [rawData, setRawData] = useState<DegiroHeaders[] | NordnetHeaders[]>([]);
    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [dataSource, setDataSource] = useState<"Degiro" | "Nordnet">();
    const [rows, setRows] = useState<ColumnDataSecurity[]>([]);
    const [parseError, setParseError] = useState("")
    const [errorFifo, setErrorFifo] = useState("")


    const [tmpResult, setTmpResult] = useState(0);

    const clearRows = () => {
        setFiles([])
        setRows([])
        setRawData([])
        setShowTable(false)
        setZoneHeight(400)
    }

    const fileCallback = (file: FileObject[]) => setFiles(file)
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
    });



    const calculateFIFO = () => {
        let fifoData: Transaction[] = []
        try {
            if (dataSource === 'Degiro') {
                fifoData = calculateFIFOTransactions(prepareDegiroForFIFO(rawData as DegiroHeaders[]))
            } else if (dataSource === 'Nordnet') {
                fifoData = calculateFIFOTransactions(prepareNordnetForFIFO(rawData as NordnetHeaders[]))
            }
            console.log("maol", fifoData)
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
                setZoneHeight(200)
                setShowTable(true)
                const data = await chooseCSVParser(files, parsers)
                const dataSource = data[0]?.Source
                if (dataSource === 'Degiro') {
                    setDataSource('Degiro')
                    const degiroColumns = getDegiroAsColumns(data as DegiroHeaders[])
                    setRawData([...rawData, ...data] as DegiroHeaders[])
                    setRows([...rows, ...degiroColumns])
                    setZoneHeight(200)
                    setShowTable(true)
                } else if (dataSource === 'Nordnet') {
                    setDataSource('Nordnet')
                    const nordnetColumns = getNordnetAsColumns(data as NordnetHeaders[])
                    setRawData([...rawData, ...data] as NordnetHeaders[])
                    setRows([...rows, ...nordnetColumns])
                    setZoneHeight(200)
                    setShowTable(true)
                }
            }
        })()
    }, [files])


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
                        Arvopaperit
                    </Typography>
                    {parseError && <Alert severity="error">{parseError}</Alert>}
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Nordnet, Degiro
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
                    {(showTable && results.length === 0) && <ResultTable mode="Security" rows={rows} />}
                    {showTable && results.length > 0 &&
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

export { Securities }

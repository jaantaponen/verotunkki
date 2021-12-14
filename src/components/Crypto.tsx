import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
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

const parsers = [parseCoinbaseProCSV, parseDegiroCSV, parseCoinbaseCSV, parseNordNetCSV]
/**
 * Workaround for browsers.
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
const b64_to_utf8 = (str: string) => {
    return decodeURIComponent(escape(window.atob(str)));
}

/**
 * Gets the current file and checks it againts parsers.
 * @param filesCopy 
 * @returns headers
 */
const parseCSV = (filesCopy: FileObject[]) => {
    for (let i = 0; i < parsers.length; i++) {
        try {
            const fileContentBuffer = Buffer.from(b64_to_utf8(filesCopy[0].data!.toString().split(',')[1]))
            const fileContent = fileContentBuffer.toString('utf8')
            const parsedData = parsers[i](fileContent)
            return parsedData
        } catch (e) {
            console.log(e)
        }
    }
    return []
}

const Crypto = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [rows, setRows] = useState<ColumnDataCrypto[]>([]);
    const [rawData, setRawData] = useState<CoinbaseHeaders[] | CoinbaseProHeaders[]>([]);
    const [results, setResults] = useState<ColumnDataTransaction[]>([]);
    const [dataSource, setDataSource] = useState<"Coinbase" | "CoinbasePro">();

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
        let fifoData: Transaction[] = []
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

    }

    useEffect(() => {
        if (files.length > 0) {
            setZoneHeight(200)
            setShowTable(true)
            const data = parseCSV(files)
            const dataSource = data[0]?.Source
            if (dataSource === 'Coinbase') {
                setDataSource('Coinbase')
                const coinBaseColumns = getCoinbaseAsColumns(data as CoinbaseHeaders[])
                setRawData([...rawData,...data] as CoinbaseHeaders[])
                setRows([...rows, ...coinBaseColumns])
            } else if (dataSource === 'CoinbasePro') {
                setDataSource('CoinbasePro')
                const coinBaseProColumns = getCoinbaseProAsColumns(data as CoinbaseProHeaders[])
                setRawData([...rawData,...data] as CoinbaseProHeaders[])
                setRows([...rows, ...coinBaseProColumns])
            }
        }

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
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Coinbase, Coinbase Pro
                    </Typography>
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
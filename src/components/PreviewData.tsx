import { useEffect, useState, forwardRef } from 'react'
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, createTheme, Stack, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { getCoinbaseAsColumns, getDataCoinbase, getDataCoinbasePro, getDataDegiro, getDataNordnet } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders, CoinbaseProHeaders, DegiroHeaders, NordnetHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import { ResultCard } from './ResultCard'
import { ColumnDataCrypto, ColumnDataSecurity, ColumnDataTransaction, columnsCrypto, columnsSecurity } from './tableSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { calculateFIFOTransactions } from '../utils/fifo'
import { chooseCSVParser, parseColumnDataToFIFO } from '../utils/parsers/helpers'
import axios from 'axios';
import moment, { invalid } from 'moment';
import { PreviewTable } from './PreviewTable'
import { nanoid } from 'nanoid'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
    acquisitionFees: number,
    sellprices: number
}

export interface resultFromParse {
    orig?: rawDatas
    rows?: ColumnDataSecurity[] | ColumnDataCrypto[]
    Error?: Error
    fileName?: string
}

interface Props {
    mode: "CRYPTO" | "SECURITY"
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const PreviewData = ({ mode }: Props) => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [showThankYou, setShowThankYou] = useState(false)

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
            const fifoData = parseColumnDataToFIFO(rowDataColumn, originalData)
            const finalFifo = calculateFIFOTransactions(fifoData)
            setResults(finalFifo.map((x, idx) => ({
                ...x,
                buydate: new Date(x.buydate),
                selldate: new Date(x.selldate),
                transferFee: `${Number(x.transferFee)} EUR`,
                profitOrLoss: `${Number(x.profitOrLoss - (Math.abs(x.acquisitionFee) + Math.abs(x.transferFee)))} EUR`,
                id: idx
            })))

            setCalculatedResults(() => {
                return {
                    capitalGains: _.sumBy(finalFifo, (o) => {
                        const minusFees = o.profitOrLoss - (Math.abs(o.acquisitionFee) + Math.abs(o.transferFee))
                        return minusFees > 0 ? minusFees : 0
                    }),
                    capitalLosses: _.sumBy(finalFifo, (o) => {
                        const minusFees = o.profitOrLoss - (Math.abs(o.acquisitionFee) + Math.abs(o.transferFee))
                        return minusFees < 0 ? minusFees : 0
                    }),
                    acquisitionFees: _.sumBy(finalFifo, (o) => ((o.amountsold * o.acquisitionPrice) + Math.abs(o.acquisitionFee))),
                    sellprices: _.sumBy(finalFifo, (o) => ((o.amountsold * o.transferPrice) - Math.abs(o.transferFee)))
                }
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
                            kulut: `${0} EUR`, // Only set fees for the other divided transaction
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
                const data = (await chooseCSVParser(files, mode === "CRYPTO" ? parsersCrypto : parsersSecurity)) as resultFromParse[]
                const successFul = _.uniqBy(data.filter(x => !x.Error), y => y.fileName)
                const errors = _.uniqBy(data.filter(x => x.Error), y => y.fileName)
                if (errors.length > 0 && successFul.length !== errors.length) {
                    const error = errors.find(err => !successFul.map(x => x.fileName).includes(err.fileName))
                    const msg = error?.Error ? error.Error.message : ""
                    if (msg.toString().includes('All headers not found in the provided')) {
                        console.error("Debug Parser error: ", msg)
                        setParseError(`Error loading headers in ${error?.fileName} Are you tryin to parse in the wrong site?`)
                    } else if (msg === "malformed URI sequence") {
                        console.error("Debug Parser error: ", msg)
                        setParseError(`Encoding error while trying to parse file ${error?.fileName} are you in the correct place?`)
                    } else if (msg.startsWith("Invalid")) {
                        setParseError(`Parser error while trying to parse file ${error?.fileName} are you in the correct place?`)
                        console.error("Debug Parser error: ", msg)
                    } else {
                        console.error(`Debug error in file ${error?.fileName}: ${msg}`)
                        setParseError(msg)
                    }
                }

                if (successFul.length > 0) {
                    const newRows = data.filter(result => result.rows)
                    setRowDataColumn([...rowDataColumn.concat(...newRows.map(x => x.rows) as any)])
                    // Set row data so if user has edited a field and uploads a new file it's handled correctly
                    setRawDataAsColumns([...rowDataColumn.concat(...newRows.map(x => x.rows) as any)])
                    const newRawData = Object.assign(originalData, ...data.map(result => result.orig))
                    setOriginalData(newRawData)
                    setShowTable(true)
                }
                setFiles([])
            }
        })()
    }, [files])

    useEffect(() => {
        const enableCurrencyWarning = rowDataColumn
            .find(invalid => invalid?.kokonaissumma?.split(' ')[1] !== 'EUR'
                && (invalid.operation === 'BUY'
                    || invalid.operation === 'SELL'))
        setShowCurrencyFetchButton(!!enableCurrencyWarning && rowDataColumn.length > 0)
    }, [rowDataColumn])

    useEffect(() => {
        (async () => {
            if (results.length > 0) {
                const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
                await sleep(6000)
                setShowThankYou(true)
            }
        })()
    }, [results])


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
                                <ResultCard header="Luovutusvoitto"
                                    content={calculatedResults.capitalGains.toFixed(2)}
                                    footer="Voitot" footerSecondary="yhteensä"
                                    contentColor="success.light"
                                    infoHover='Luovutusvoittoa syntyy tilanteessa, jossa luovutetun omaisuuden myyntihinta ylittää sen hankintamenon ja voiton hankkimisesta aiheutuneet menot.'
                                    infoDirection='left'
                                />
                                <ResultCard header="Luovutustappio"
                                    content={calculatedResults.capitalLosses.toFixed(2)}
                                    footer="Häviöt"
                                    footerSecondary="yhteensä"
                                    contentColor="error.light"
                                    infoHover='Luovutustappiota puolestaan syntyy tilanteessa, jossa luovutetun omaisuuden myyntihinta alittaa sen hankintamenon ja voiton hankkimisesta aiheutuneet menot.'
                                    infoDirection='right'
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                                <ResultCard header="Hankintahinnat yhteensä"
                                    content={calculatedResults.acquisitionFees.toFixed(2)}
                                    footer=""
                                    footerSecondary="Hankintahinnat + hankinnasta aiheutuneet kulut"
                                    contentColor="error.light"
                                    infoHover='Arvopaperien hankintahinnat eli niiden hankintahinnat ja muut hankinnasta aiheutuneet kulut yhteensä.'
                                    infoDirection='left'
                                />
                                <ResultCard header="Myyntihinnat yhteensä"
                                    content={calculatedResults.sellprices.toFixed(2)}
                                    footer=""
                                    footerSecondary="Myyntihinnat - myynnistä aiheutuneet kulut"
                                    contentColor={calculatedResults.sellprices > 0 ? 'success.light' : 'error.light'}
                                    infoHover='Kaikkien vuoden aikana myymiesi arvopaperien myyntihinnat yhteensä eli myyntihintojen ja myynnistä aiheutuneiden kulujen erotus. Myynnistä aiheutuneita kuluja ovat esimerkiksi välityspalkkiot.'
                                    infoDirection='right'
                                />
                            </Stack>
                        </Stack>}
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        {mode === 'CRYPTO' ? "Tuetut lähteet: Coinbase, Coinbase Pro" : "Tuetut lähteet: Nordnet, Degiro"}
                    </Typography>
                    {errorFifo && <Alert severity="error">{errorFifo}</Alert>}
                    {showCurrencyFetchButton &&
                        <Stack direction="row" alignItems="flex-end" justifyContent="center" spacing={2} sx={{ pb: 1 }}>
                            <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
                                <Alert severity="warning" >
                                    You have made transactions that have not been traded in EUR. Do you want to use an <strong>external API</strong> to fetch the currency info?
                                </Alert>
                                <Alert severity="info" >
                                    Note that if the error originated from Coinbase Pro, the currency transfer needs to be converted in to one buy and sell operation.
                                </Alert>
                            </Stack>
                            <div style={{ paddingBottom: "4px" }}>


                                <Button variant="contained" sx={{ minWidth: "140px", minHeight: "42px" }} onClick={currencyClick} endIcon={<DownloadIcon />} >I accept</Button>
                            </div>
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
                    {results.length > 0 && <ResultTable rows={results} mode={mode} />}
                </Stack>
                {<Copyright />}
                <Snackbar onClose={() => setShowThankYou(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} open={showThankYou} >
                    <Alert onClose={() => setShowThankYou(false)} severity="info" sx={{ width: '100%' }}>
                        <AlertTitle>Jos työkalusta oli hyötyä niin arvostaisin tähteä &lt;3</AlertTitle>
                        <a style={{ color: "FloralWhite", textDecoration: 'none' }} href='https://github.com/jaantaponen/verotunkki' target="_blank"><strong>Paina tätä päästäksesi GitHubiin.</strong> </a>
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider >
    );
}

export { PreviewData }

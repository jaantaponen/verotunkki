import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { parseDegiroCSV, getDegiroAsColumns, parseCoinbaseCSV, parseNordNetCSV, getCoinbaseAsColumns } from '../utils/parsers/loadTransactions'
import { CoinbaseHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import { ColumnDataCrypto, columnsCrypto } from './tableSettings';

const parsers = [parseDegiroCSV, parseCoinbaseCSV, parseNordNetCSV]
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

    const fileCallback = (file: FileObject[]) => setFiles(file)
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
    });

    useEffect(() => {
        if (files.length > 0) {
            setZoneHeight(200)
            setShowTable(true)
            const data = parseCSV(files)
            const dataSource = data[0]?.Source
            if (dataSource === 'Coinbase') {
                const coinBaseColumns = getCoinbaseAsColumns(data as CoinbaseHeaders[])
                setRows(coinBaseColumns)
                console.log("hyvä elama", coinBaseColumns)
            }


        }
        console.log('Files changed: ', files)

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
                        Virtuaalivaluutat
                    </Typography>
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Coinbase, Coinbase Pro
                    </Typography>
                    {showTable && <ResultTable mode="Crypto" rows={rows} />}
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { Crypto }

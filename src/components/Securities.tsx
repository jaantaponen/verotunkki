import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Copyright';
import { parseDegiroCSV, getDegiroAsColumns, parseCoinbaseCSV, parseNordNetCSV, getCoinbaseAsColumns } from '../utils/parsers/loadTransactions'
import { DegiroHeaders, NordnetHeaders, CoinbaseHeaders } from '../utils/parsers/types';
import { ResultTable } from './ResultTable'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { ColumnDataSecurity } from './tableSettings';
import {chooseCSVParser} from '../utils/parsers/parseUtils'
const parsers = [parseDegiroCSV, parseNordNetCSV]

const Securities = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [rows, setRows] = useState<ColumnDataSecurity[]>([]);

    const fileCallback = (file: FileObject[]) => setFiles(file)
    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
    });

    useEffect(() => {
        (async () => {
            if (files.length > 0) {
                setZoneHeight(200)
                setShowTable(true)
                const data = await chooseCSVParser(files, parsers)
                const dataSource = data[0]?.Source
                if (dataSource === 'Degiro') {
                    const degiroColumns = getDegiroAsColumns(data as DegiroHeaders[])
                    setRows([...rows, ...degiroColumns])
                } else if (dataSource === 'Nordnet') {

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
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Nordnet, Degiro
                    </Typography>
                    {showTable && <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Stack>}
                    {showTable && <ResultTable mode="Security" rows={rows} />}
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { Securities }

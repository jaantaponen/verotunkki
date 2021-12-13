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
import { DegiroHeaders, NordnetHeaders, CoinbaseHeaders } from '../utils/parsers/types';
import { ColumnDataSecurity, columnsSecurity } from './tableSettings'

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

const Securities = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);

    // Table specific states
    const [showTable, setShowTable] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<ColumnDataSecurity[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (files.length > 0) {
            setZoneHeight(200)
            setShowTable(true)
            const data = parseCSV(files)
            const dataSource = data[0]?.Source
            if (dataSource === 'Degiro') {
                const degiroColumns = getDegiroAsColumns(data as DegiroHeaders[])
                setRows(degiroColumns)
                console.log("hyvä elama", degiroColumns)
            } else if (dataSource === 'Coinbase') {
                const degiroColumns = getCoinbaseAsColumns(data as CoinbaseHeaders[])
                setRows(degiroColumns)
                console.log("hyvä elama", degiroColumns)
            } else if (dataSource === 'Nordnet') {

            } else {
                console.log("Nyt on oikeat hädät")
            }
        }
        console.log('Files changed: ', files)

    }, [files])

    const fileCallback = (file: FileObject[]) => {
        setFiles(file)
    }

    const theme = createTheme({
        typography: {
            fontSize: 14,
        },
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
                        Arvopaperit
                    </Typography>
                    <Dropzone zoneHeight={zoneHeight} handleFiles={fileCallback} />
                    <Typography alignSelf="flex-start" sx={{ pl: 4 }} component="p">
                        Tuetut lähteet: Nordnet, Degiro
                    </Typography>
                    {showTable && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 1400 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columnsSecurity.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.isin}>
                                                    {columnsSecurity.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>}
                </Stack>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

export { Securities }

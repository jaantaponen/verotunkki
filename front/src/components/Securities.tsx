import { ChangeEvent, Fragment, useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider } from '@mui/material';
import { Dropzone } from './Dropzone';
import { FileObject } from 'react-mui-dropzone';
import { Copyright } from './Frontpage';
import { parseDegiroCSV, getDegiroAsColumns } from '../utils/parsers/loadTransactions'


interface Column {
    id: 'paivays' | 'tuote' | 'isin' | 'maara' | 'arvo' | 'kulut' | 'kokonaissumma' | 'kurssi';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'paivays', label: 'Paivays', minWidth: 150 },
    { id: 'tuote', label: 'Tuote', minWidth: 200 },
    { id: 'isin', label: 'ISIN', minWidth: 170 },
    {
        id: 'maara', label: 'Maara', minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    { id: 'kurssi', label: 'Kurssi', minWidth: 120 },
    { id: 'arvo', label: 'Arvo', minWidth: 100 },
    { id: 'kulut', label: 'Kulut', minWidth: 100 },
    { id: 'kokonaissumma', label: 'Kokonaissumma', minWidth: 170 },
];

export interface ColumnData {
    paivays: string;
    tuote: string;
    isin: string;
    arvo: string;
    maara: number;
    kulut: number;
    kurssi: string;
    kokonaissumma: string;
}

/* const createData = (
    name: string,
    code: string,
    population: number,
    size: number,
): ColumnData => {
    const density = population / size;
    return { name, code, population, size, density };
} */

/* const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];
 */

const b64_to_utf8 = (str: string) => {
    return decodeURIComponent(escape(window.atob(str)));
}

const Securities = () => {
    const [zoneHeight, setZoneHeight] = useState(400);
    const [files, setFiles] = useState<FileObject[]>([]);
    const [showTable, setShowTable] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<ColumnData[]>([]);

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
            const fileContentBuffer = Buffer.from(b64_to_utf8(files[0].data!.toString().split(',')[1]))
            const fileContent = fileContentBuffer.toString('utf8')
            console.log(fileContent)
            const degiroStuff = parseDegiroCSV(fileContent)
            const columnstuff = getDegiroAsColumns(degiroStuff)
            setRows(columnstuff)
            console.log("hyvä elama", columnstuff)
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
                                        {columns.map((column) => (
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
                                                    {columns.map((column) => {
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
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    width={"sm"}
                    sx={{ pt: 0 }}
                >
                    <Typography alignSelf="center" align="center" component="p" sx={{ pt: 4 }}>
                        Tarkista tiedot aina itse virheiden varalta.
                    </Typography>
                    <Typography alignSelf="center" align="center" component="p" sx={{ pt: 0 }}>
                        Oleta, että tämän sivuston tekijät eivät tiedä mitään veroista.
                    </Typography>
                    <Typography alignSelf="center" align="center" component="p" sx={{ pt: 0 }}>
                        Sivustolle lähettämiäsi tiedostoja käsitellään vain paikallisesti selaimessasi.
                    </Typography>
                    <Copyright />
                </Stack>

            </Container>

        </ThemeProvider>
    );
}

export { Securities }

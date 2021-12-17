import { ChangeEvent, useEffect, useState } from 'react'
import { Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ColumnCrypto, ColumnDataCrypto, ColumnDataSecurity, columnsCrypto, ColumnSecurity, columnsSecurity, columnsTransaction, ColumnTransaction, ColumnDataTransaction } from './tableSettings'
interface Props {
    rows: ColumnDataSecurity[] | ColumnDataCrypto[] | ColumnDataTransaction[],
    mode: "CRYPTO" | "SECURITY" | 'RESULT',
}


const ResultTable = ({ rows, mode }: Props) => {

    // Table specific states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let columns: readonly ColumnSecurity[] | readonly ColumnCrypto[] | readonly ColumnTransaction[] = []
    if (mode === "SECURITY") {
        columns = columnsSecurity
    } else if (mode === "CRYPTO") {
        columns = columnsCrypto
    } else if (mode === "RESULT") {
        columns = columnsTransaction
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        window.scrollTo(0, 250)
    }, [])

    return (<><Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        .map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = (row as any)[column.id]
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
    </Paper>
    </>)
}

export { ResultTable }

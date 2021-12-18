import React, { ChangeEvent, useEffect, useState } from 'react'
import { Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ColumnDataCrypto, ColumnDataSecurity, columnsCrypto, columnsTransaction, ColumnTransaction, ColumnDataTransaction, columnsSecurity } from './tableSettings'
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';

interface Props {
    rows: ColumnDataSecurity[] | ColumnDataCrypto[],
    mode: 'CRYPTO' | 'SECURITY'
}

const PreviewTable = ({ rows, mode }: Props) => {
    const [nauraa, setNauraa] = useState([]);


    useEffect(() => {
        console.log(nauraa)
    }, [nauraa])

    return (

        <DataGrid
            sx={{ height: 700 }}
            rows={rows as GridRowsProp}
            columns={mode === 'CRYPTO' ? columnsCrypto : columnsSecurity}
            onCellEditCommit={(newSelection) => {
                setNauraa(newSelection as any);
            }}
        />

    )
}

export { PreviewTable }

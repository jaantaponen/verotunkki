import React, { ChangeEvent, useEffect, useState } from 'react'
import { Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ColumnDataCrypto, ColumnDataSecurity, columnsCrypto, columnsTransaction, ColumnTransaction, ColumnDataTransaction, columnsSecurity } from './tableSettings'
import { DataGrid, GridCellEditCommitParams, GridRowsProp } from '@mui/x-data-grid';
import { rawDatas } from './PreviewData';
import _ from 'lodash';

interface Props {
    rows: ColumnDataSecurity[] | ColumnDataCrypto[],
    mode: 'CRYPTO' | 'SECURITY'
    rawDataAsColumns: ColumnDataSecurity[] | ColumnDataCrypto[],
    rawDatatSetCallback(arg0: ColumnDataSecurity[] | ColumnDataCrypto[]): void
}

const PreviewTable = ({ rows, mode, rawDataAsColumns, rawDatatSetCallback }: Props) => {
    const [cellCommit, setCellCommit] = useState({} as any);

    useEffect(() => {
        if (cellCommit?.row?.id) {
            const matchingRow = rawDataAsColumns.find(y => y.id === cellCommit.row.id) 
            const newObj = {...matchingRow, [cellCommit.field] : cellCommit.value} as ColumnDataSecurity | ColumnDataCrypto
            const arr =  rawDataAsColumns.map(item => item.id === newObj.id ? newObj : item) as ColumnDataSecurity[] | ColumnDataCrypto[]
            rawDatatSetCallback(arr)
        }
    }, [cellCommit])

    return (

        <DataGrid
            sx={{
                height: 700,
                '& .font-tabular-nums': {
                    fontVariantNumeric: 'tabular-nums',
                },
            }}
            rows={rows as GridRowsProp}
            columns={mode === 'CRYPTO' ? columnsCrypto : columnsSecurity}
            onCellEditCommit={(newSelection) => {
                setCellCommit(newSelection);
            }}
        />

    )
}

export { PreviewTable }

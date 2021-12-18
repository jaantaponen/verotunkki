import React, { ChangeEvent, useEffect, useState } from 'react'
import { Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ColumnDataCrypto, ColumnDataSecurity, columnsCrypto, columnsTransaction, ColumnTransaction, ColumnDataTransaction, columnsSecurity } from './tableSettings'
import { DataGrid, GridCellEditCommitParams, GridRowsProp } from '@mui/x-data-grid';
import { rawDatas } from './PreviewData';

interface Props {
    rows: ColumnDataSecurity[] | ColumnDataCrypto[],
    mode: 'CRYPTO' | 'SECURITY'
    rawData: rawDatas
    rawDatatSetCallback(arg0: rawDatas) : void
}

const PreviewTable = ({ rows, mode, rawData, rawDatatSetCallback }: Props) => {
    const [cellCommit, setCellCommit] = useState({} as any);


    useEffect(() => {
        const rawCopy: any = {...rawData}
        Object.keys(rawCopy).forEach((key: any)=> {
            const a = rawCopy[key].find((y : any) => y.id === cellCommit.row.id)
            console.log(a)
        })

        
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

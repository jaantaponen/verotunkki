import { columnsTransaction, ColumnDataTransaction } from './tableSettings'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
    GridRowsProp
} from '@mui/x-data-grid';

import './printTableStyles.css'

interface Props {
    rows: ColumnDataTransaction[],
    mode: 'CRYPTO' | 'SECURITY'
}

const CustomToolbar = () => {
    return (
        <GridToolbarContainer style={{paddingLeft: 24}} className={gridClasses.toolbarContainer}>
            <GridToolbarExport printOptions={{
                bodyClassName: "printTableStyles", hideToolbar: true, hideFooter: true, allColumns: true
            }}
            />
        </GridToolbarContainer>
    );
}

const ResultTable = ({ rows, mode }: Props) => {
    return (<div style={{ width: '100%' }}>
        <DataGrid
            sx={{
                minHeight: 700,
            }}
            rows={rows as GridRowsProp}
            columns={columnsTransaction(mode)}
            components={{
                Toolbar: CustomToolbar,
            }}
        />
    </div>

    )
}

export { ResultTable }

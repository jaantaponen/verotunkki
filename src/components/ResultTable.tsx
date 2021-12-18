import { columnsTransaction, ColumnDataTransaction } from './tableSettings'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
    GridRowsProp
} from '@mui/x-data-grid';
interface Props {
    rows: ColumnDataTransaction[],
}

const CustomToolbar = () => {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const ResultTable = ({ rows }: Props) => {
    return (<div style={{ width: '100%' }}>
        <DataGrid
            sx={{
                minHeight: 700,
            }}
            rows={rows as GridRowsProp}
            columns={columnsTransaction}
            components={{
                Toolbar: CustomToolbar,
            }}
        />
    </div>

    )
}

export { ResultTable }

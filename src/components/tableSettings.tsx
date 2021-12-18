import { GridColTypeDef, GridColumns } from '@mui/x-data-grid';

export interface ColumnTransaction {
    id: 'ticker' | 'buydate' | 'selldate' | 'amountsold' | 'transferPrice' | 'acquisitionPrice' | 'acquisitionFee' | 'transferFee' | 'profitOrLoss';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


/* const columnsTransaction: readonly ColumnTransaction[] = [
    { id: 'ticker', label: 'Tuote', minWidth: 120 },
    { id: 'buydate', label: 'Hankintapäivä', minWidth: 150 },
    { id: 'selldate', label: 'Luovutuspäivä', minWidth: 150 },
    {
        id: 'amountsold', label: 'Myyty kpl', minWidth: 100,
        format: (value: number) => value.toFixed(8)
    },
    { id: 'transferPrice', label: 'Luovutushinta', minWidth: 120 },
    {
        id: 'acquisitionPrice', label: 'Hankintahinta', minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    { id: 'acquisitionFee', label: 'Hankintakulut', minWidth: 100 },
    { id: 'transferFee', label: 'Luovutuskulut', minWidth: 80 },
    {
        id: 'profitOrLoss', label: 'Voitto/Tappio', minWidth: 170,
        format: (value: number) => value.toFixed(3)
    },
]; */


const currencyFormatter = (value: any) => new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: value,
});

const currencyFormat: GridColTypeDef = {
    type: 'string',
    width: 130,
    valueFormatter: ({ value }) => {
        const str = String(value) ? String(value) : "0 EUR"
        const arr = str.split(' ').length === 2 ? str.split(' ') : "0 EUR"
        return currencyFormatter(arr[1]).format(Number(arr[0]))
    },
    cellClassName: 'font-tabular-nums',
};

const columnsSecurity: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', type: 'date', editable: true, minWidth: 180, },
    { field: 'operation', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 120 },
    { field: 'isin', headerName: 'ISIN', type: 'string', editable: true, minWidth: 120 },
    { field: 'arvo', headerName: 'Arvo', type: 'string', editable: true, minWidth: 120 },
    { field: 'maara', headerName: 'Määrä', type: 'number', editable: true, minWidth: 120 },
    { field: 'kurssi', headerName: 'Kurssi', type: 'string', editable: true, minWidth: 120 },
    { field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110 },
    { field: 'kokonaissumma', headerName: 'Kokonaissumma', type: 'string', editable: true, minWidth: 170 },
];




const columnsCrypto: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', type: 'date', editable: true, minWidth: 180, },
    { field: 'operation', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 120 },
    { field: 'tuote', headerName: 'Tuote', type: 'string', editable: true, minWidth: 120 },
    { field: 'arvo', headerName: 'Arvo', type: 'string', editable: true, minWidth: 120 },
    { field: 'maara', headerName: 'Määrä', type: 'string', editable: true, minWidth: 120 },
    { field: 'kurssi', headerName: 'Kurssi', type: 'string', editable: true, minWidth: 120 },
    { field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110 },
    { field: 'kokonaissumma', headerName: 'Kokonaissumma', ...currencyFormat, editable: true, minWidth: 170 },
];


const columnsTransaction: GridColumns = [
    { field: 'ticker', headerName: 'Tuote', type: 'string', editable: true, minWidth: 50, },
    { field: 'buydate', headerName: 'Hankintapäivä', type: 'date', editable: true, minWidth: 160 },
    { field: 'selldate', headerName: 'Luovutuspäivä', type: 'date', editable: true, minWidth: 160 },
    { field: 'amountsold', headerName: 'Myyty kpl', type: 'number', editable: true, minWidth: 50 },
    { field: 'transferPrice', headerName: 'Luovutushinta', type: 'string', editable: true, minWidth: 120 },
    { field: 'acquisitionPrice', headerName: 'Hankintahinta', type: 'string', editable: true, minWidth: 120 },
    { field: 'acquisitionFee', headerName: 'Hankintakulut', type: 'string', editable: true, minWidth: 120 },
    { field: 'transferFee', headerName: 'Luovutuskulut', type: 'string', editable: true, minWidth: 120 },
    { field: 'profitOrLoss', headerName: 'Voitto/Tappio', type: 'string', editable: true, minWidth: 170 },
];


export interface ColumnDataSecurity {
    readonly id: string;
    paivays: string;
    tuote: string;
    isin: string;
    arvo: string;
    maara: number;
    kulut: string;
    kurssi: string;
    kokonaissumma: string;
    operation: string;
}


export interface ColumnDataCrypto {
    readonly id: string;
    paivays: string;
    operation: string;
    tuote: string;
    arvo: string;
    maara: number;
    kulut: string;
    kurssi: string;
    kokonaissumma: string;
}


export interface ColumnDataTransaction {
    readonly id: number;
    ticker: string
    buydate: string
    selldate: string
    amountsold: number
    transferPrice: number
    acquisitionPrice: number
    acquisitionFee: number
    transferFee: string
    profitOrLoss: string
}



export { columnsSecurity, columnsCrypto, columnsTransaction }

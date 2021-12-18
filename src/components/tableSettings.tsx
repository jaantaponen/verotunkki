import { GridColumns } from '@mui/x-data-grid';

export interface ColumnTransaction {
    id: 'ticker' | 'buydate' | 'selldate' | 'amountsold' | 'transferPrice' | 'acquisitionPrice' | 'acquisitionFee' | 'transferFee' | 'profitOrLoss';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


const columnsTransaction: readonly ColumnTransaction[] = [
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
];


const columnsSecurity: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', type: 'date', editable: true, width: 180, },
    { field: 'operaatio', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 120 },
    { field: 'isin', headerName: 'ISIN', type: 'string', editable: true, minWidth: 120 },
    { field: 'arvo', headerName: 'Arvo', type: 'string', editable: true, minWidth: 120 },
    { field: 'maara', headerName: 'Määrä', type: 'number', editable: true, minWidth: 120 },
    { field: 'kurssi', headerName: 'Kurssi', type: 'string', editable: true, minWidth: 120 },
    { field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110 },
    { field: 'kokonaissumma', headerName: 'Kokonaissumma', type: 'string', editable: true, minWidth: 170 },
];




const columnsCrypto: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', type: 'date', editable: true, width: 180, },
    { field: 'operaatio', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 120 },
    { field: 'tuote', headerName: 'Tuote', type: 'string', editable: true, minWidth: 120 },
    { field: 'arvo', headerName: 'Arvo', type: 'string', editable: true, minWidth: 120 },
    { field: 'maara', headerName: 'Määrä', type: 'number', editable: true, minWidth: 120 },
    { field: 'kurssi', headerName: 'Kurssi', type: 'string', editable: true, minWidth: 120 },
    { field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110 },
    { field: 'kokonaissumma', headerName: 'Kokonaissumma', type: 'string', editable: true, minWidth: 170 },
];


export interface ColumnDataSecurity {
    readonly id: string;
    paivays: string;
    tuote: string;
    isin: string;
    arvo: string;
    maara: number;
    kulut: number;
    kurssi: string;
    kokonaissumma: string;
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
    operaatio: string;
}


export interface ColumnDataTransaction {
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

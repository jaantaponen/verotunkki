import { GridColTypeDef, GridColumns } from '@mui/x-data-grid';

export interface ColumnTransaction {
    id: 'ticker' | 'buydate' | 'selldate' | 'amountsold' | 'transferPrice' | 'acquisitionPrice' | 'acquisitionFee' | 'transferFee' | 'profitOrLoss';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const currencyFormatter = (value: any) => new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: value,
});

const validateOperation = (operation: any) => {
    return operation === "BUY" || operation === "SELL"
}

const validateCurrency = (currencyInput: any) => {
    const string = String(currencyInput) ?? ""
    return string.split(' ').length === 2
}

const currencyFormat: GridColTypeDef = {
    type: 'string',
    valueFormatter: ({ value }) => {
        const str = String(value) ? String(value) : "0 EUR"
        const arr = str.split(' ').length === 2 ? str.split(' ') : "0 EUR"
        try {
            return currencyFormatter(arr[1]).format(Number(arr[0]))
        } catch (e) {
            return str
        }

    },
    cellClassName: 'font-tabular-nums',
};

const currencyFormatResults: GridColTypeDef = {
    type: 'number',
    valueFormatter: ({ value }) => {
        const str = String(value) ? String(value) : "0 EUR"
        const arr = str.split(' ').length === 2 ? str.split(' ') : "0 EUR"
        try {
            return currencyFormatter(arr[1]).format(Number(arr[0]))
        } catch (e) {
            return new Intl.NumberFormat('fi-FI', {
                style: 'currency',
                currency: "EUR",
            }).format(Number(str))
        }

    },
    cellClassName: 'font-tabular-nums',
};

const timeFormat: GridColTypeDef = {
    type: 'dateTime',
    valueFormatter: ({ value }) => {
        const date = new Date(value as any);
        const options: any = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        return date.toLocaleString("en-GB", options);
    },
    cellClassName: 'font-tabular-nums',
};

const columnsSecurity: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', ...timeFormat, editable: true, minWidth: 180, },
    {
        field: 'operation', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 40,
        preProcessEditCellProps: (params) => {
            const isValid = validateOperation(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    { field: 'tuote', headerName: 'Tuote', type: 'string', editable: true, minWidth: 240 },
    {
        field: 'arvo', headerName: 'Arvo', editable: true, minWidth: 120,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    { field: 'maara', headerName: 'Määrä (kpl)', type: 'number', editable: true, minWidth: 50 },
    {
        field: 'kurssi', headerName: 'Kurssi', editable: true, minWidth: 120,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    {
        field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    {
        field: 'kokonaissumma', headerName: 'Kokonaissumma', editable: true, minWidth: 170,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
];




const columnsCrypto: GridColumns = [
    { field: 'paivays', headerName: 'Paivays', ...timeFormat, editable: true, minWidth: 180, },
    {
        field: 'operation', headerName: 'Operaatio', type: 'string', editable: true, minWidth: 140,
        preProcessEditCellProps: (params) => {
            const isValid = validateOperation(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    { field: 'tuote', headerName: 'Tuote', type: 'string', editable: true, minWidth: 120 },
    {
        field: 'arvo', headerName: 'Arvo', editable: true, minWidth: 120,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    { field: 'maara', headerName: 'Määrä (kpl)', type: 'number', editable: true, minWidth: 120 },
    {
        field: 'kurssi', headerName: 'Kurssi', editable: true, minWidth: 120,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    {
        field: 'kulut', headerName: 'Kulut', type: 'number', editable: true, minWidth: 110,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
    {
        field: 'kokonaissumma', headerName: 'Kokonaissumma', editable: true, minWidth: 170,
        ...currencyFormat,
        preProcessEditCellProps: (params) => {
            const isValid = validateCurrency(params.props.value);
            return { ...params.props, error: !isValid };
        },
    },
];


const columnsTransaction = (mode: 'CRYPTO' | 'SECURITY'): GridColumns => [
    { field: 'ticker', headerName: 'Tuote', type: 'string', editable: false, minWidth: mode === 'CRYPTO' ? 50: 250 },
    { field: 'buydate', headerName: 'Hankintapäivä', type: 'date', editable: false, minWidth: 120 },
    { field: 'selldate', headerName: 'Luovutuspäivä', type: 'date', editable: false, minWidth: 120 },
    { field: 'amountsold', headerName: 'Myyty kpl', type: 'number', editable: false, minWidth: 50 },
    {
        field: 'transferPrice', headerName: 'Luovutushinta', editable: false, minWidth: 120, ...currencyFormatResults,
    },
    { field: 'acquisitionPrice', headerName: 'Hankintahinta', ...currencyFormatResults, editable: false, minWidth: 120 },
    { field: 'acquisitionFee', headerName: 'hankintahinnat', ...currencyFormatResults, editable: false, minWidth: 120 },
    { field: 'transferFee', headerName: 'Luovutuskulut', ...currencyFormatResults, editable: false, minWidth: 120 },
    { field: 'profitOrLoss', headerName: 'Voitto/Tappio', ...currencyFormatResults, editable: false, minWidth: 120 },
];


export interface ColumnDataSecurity {
    readonly id: string;
    paivays: Date;
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
    paivays: Date;
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
    buydate: Date
    selldate: Date
    amountsold: number
    transferPrice: number
    acquisitionPrice: number
    acquisitionFee: number
    transferFee: string
    profitOrLoss: string
}



export { columnsSecurity, columnsCrypto, columnsTransaction }

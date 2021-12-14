export interface ColumnSecurity {
    id: 'paivays' | 'tuote' | 'isin' | 'maara' | 'arvo' | 'kulut' | 'kokonaissumma' | 'kurssi';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface ColumnCrypto {
    id: 'paivays' | 'tuote' | 'arvo' | 'maara' | 'arvo' | 'kulut' | 'kokonaissumma' | 'kurssi' | 'operaatio';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

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


const columnsSecurity: readonly ColumnSecurity[] = [
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

const columnsCrypto: readonly ColumnCrypto[] = [
    { id: 'paivays', label: 'Paivays', minWidth: 150 },
    { id: 'operaatio', label: 'Operaatio', minWidth: 100 },
    { id: 'tuote', label: 'Tuote', minWidth: 100 },
    { id: 'arvo', label: 'Arvo', minWidth: 100 },
    {
        id: 'maara', label: 'Määrä', minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    { id: 'kurssi', label: 'Kurssi', minWidth: 120 },
    {
        id: 'kulut', label: 'Kulut', minWidth: 100,
        format: (value: number) => value.toFixed(4)
    },
    { id: 'kokonaissumma', label: 'Kokonaissumma', minWidth: 170 },
];


export interface ColumnDataSecurity {
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

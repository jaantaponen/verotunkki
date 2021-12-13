export interface ColumnSecurity {
    id: 'paivays' | 'tuote' | 'isin' | 'maara' | 'arvo' | 'kulut' | 'kokonaissumma' | 'kurssi';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface ColumnCrypto {
    id: 'paivays' | 'tuote' | 'arvo' | 'maara' | 'arvo' | 'kulut' | 'kokonaissumma' | 'kurssi';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

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
    { id: 'tuote', label: 'Tuote', minWidth: 100 },
    { id: 'arvo', label: 'Arvo', minWidth: 100 },
    {
        id: 'maara', label: 'Maara', minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    { id: 'kurssi', label: 'Kurssi', minWidth: 120 },
    { id: 'kulut', label: 'Kulut', minWidth: 100 },
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
    tuote: string;
    arvo: string;
    maara: number;
    kulut: string;
    kurssi: string;
    kokonaissumma: string;
}

export { columnsSecurity, columnsCrypto }

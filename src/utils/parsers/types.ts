export interface DegiroHeaders {
  time: string;
  security: string;
  ISIN: string;
  reference: string;
  venue: string;
  quantity: number;
  rate: number;
  rateCurrency: string;
  marketValue: number;
  marketValueCurrency: string;
  value: number;
  valueCurrency: string;
  exchangeRate: number;
  transactionCosts: number;
  transactionCostsCurrency: string;
  totalAmount: number;
  totalAmountCurrency: string;
  orderId: string;
  datetime: Date;
  Source: "Degiro";
}

export interface CoinbaseHeaders {
  Timestamp: Date;
  TransactionType: "BUY" | "SELL" | "RECEIVE" | "CONVERT" | "COINBASE EARN";
  Asset: string;
  QuantityTransacted: number;
  SpotPriceCurrency: string;
  SpotPriceatTransaction: number;
  Subtotal: number;
  Total: number;
  Fees: number;
  Notes: string;
  Source: "Coinbase";
}

export interface NordnetHeaders {
  Id: string;
  Kirjauspaiva: string;
  Kauppapaiva: string;
  Maksupaiva: string;
  Salkku: string;
  Tapahtumatyyppi: string;
  Arvopaperi: string;
  Instrumenttityyppi: string;
  ISIN: string;
  Maara: number;
  Kurssi: number;
  Korko: string;
  Kokonaiskulut: number;
  KokonaiskulutValuutta: string;
  Summa: number;
  Valuutta: string;
  Hankintaarvo: string;
  Tulos: string;
  Kokonaismaara: number;
  Saldo: string;
  Vaihtokurssi: string;
  Tapahtumateksti: string;
  Mitatointipaiva: string;
  Laskelma: string;
  Vahvistusnumero: string;
  Valityspalkkio: number;
  ValityspalkkioValuutta: string;
  Source: "Nordnet";
}

export interface CoinbaseProHeaders {
  portfolio: string;
  tradeid: string;
  product: string;
  side: string;
  createdat: Date;
  size: number;
  sizeunit: string;
  price: number;
  fee: number;
  total: number;
  pricefeetotalunit: string;
  Source: "CoinbasePro"
}

export const CoinBaseProHeaderValues = [
  "portfolio",
  "tradeid",
  "product",
  "side",
  "createdat",
  "size",
  "sizeunit",
  "price",
  "fee",
  "total",
  "pricefeetotalunit"
]

export const CoinBaseHeaderValues = [
  'Timestamp',
  'TransactionType',
  'Asset',
  'QuantityTransacted',
  'SpotPriceCurrency',
  'SpotPriceatTransaction',
  'Subtotal',
  'Total',
  'Fees',
  'Notes',
]

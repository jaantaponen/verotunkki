const degiroFiToEn = {
    "Päiväys": "date",
    "Aika": "time",
    "Tuote": "security",
    "ISIN": "ISIN",
    "Reference": "reference",
    "Venue": "venue",
    "Quantity": "quantity",
    "Kurssi": "rate",
    "Kurssi-valuutta": "rateCurrency",
    "Markkina-arvo": "marketValue",
    "Markkina-arvo-valuutta": "marketValueCurrency",
    "Value": "value",
    "Value-valuutta": "valueCurrency",
    "Vaihtokurssi": "exchangeRate",
    "Transaction costs": "transactionCosts",
    "Transaction and/or third": "transactionCosts",
    "Transaction and/or third-valuutta": "transactionCostsCurrency",
    "Transaction costs-valuutta": "transactionCostsCurrency",
    "Kokonaissumma": "totalAmount",
    "Kokonaissumma-valuutta": "totalAmountCurrency",
    "Order ID": "orderId"
}

const translateDegiro = (key: keyof typeof degiroFiToEn) => {
    if (degiroFiToEn[key]) {
        return degiroFiToEn[key]
    }
}

export default translateDegiro;
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
    "Transaction costs-valuutta": "transactionCostsCurrency",
    "Kokonaissumma": "totalAmount",
    "Kokonaissumma-valuutta": "totalAmountCurrency",
    "Order ID": "orderId"
}

const translateDegiro = (key) => {
    console.log(key)
    console.log(degiroFiToEn[key])
    if (degiroFiToEn[key]) {
        return degiroFiToEn[key]
    } else {
        throw "Missing translation!"
    }
}

export default translateDegiro;
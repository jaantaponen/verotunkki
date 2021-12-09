import { FIFO } from 'fifo';
import _ from 'lodash';

const ownedSecurities = {}
const sellTransactions = []

const megaFunction = (arr) => {
    const sortedArray = _.orderBy(arr, o => o.datetime, "desc")
    sortedArray.forEach(transaction => {
        const quant = transaction.quantity
        quant > 0 ? handleBuy(transaction) : handleSell(transaction)
    })
}

const handleBuy = (transaction) => {
    // Do we already track this security
    if (!ownedSecurities[transaction.security]) {
        ownedSecurities[transaction.security] = FIFO()
    }
    const que = ownedSecurities[transaction.security]
    que.push({
        transaction: transaction,
        remaining: transaction.quantity
    })
}

const handelSell = ( transaction ) => {
    const quant = Math.abs(transaction.quantity)

    const que = ownedSecurities[transaction.security]

    // Does the first transaction in security que have enough quant to fulfill this?
    if (que.first().remaining > quant) {
        que.first().remaining -= quant
        const line = {
            "soldSecurity" : transaction.security,
            "quantity" : quant,
            "sellDate" : transaction.datetime,
            "buyDate" : que.first().transaction.datetime,
            "sellPrice" : 
        }
    } else if (que.first().remaining === toSell) {

    } else {

    }
}


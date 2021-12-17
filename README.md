# Verotunkki

This project initiated from the need to inform the Finnish Tax Administration (Verottaja) with transactions (wheter security or crypto) with FIFO based calucation. Visit [verotunkki](verotunkki.fi)


## FAQ
**Question:** How does Verotunkki calculate the results?

**Answer:** The method Verotunkki calculates and the groups the results of your transactions is a very common format called First in, First Out [(FIFO)](https://www.investopedia.com/terms/f/fifo.asp). This means if you give the algorithm a valid source of data it will produce a list with your sell orders divided as many buy transaction of what you have. From this data it's very easy to just sum your capital losses/gains. You can view an examples of the algorithm from the test [transactions](./tests/transactions.test.ts).

##
**Q:** What values do I need to report to the Tax Adminstartion (Verottaja)?

**A:** At the end result table you can see the Capital Gain, Capital Loss and total transaction per capital type.
These values can be found from Omavero. Use the instructions provided on the official [site](https://www.vero.fi/henkiloasiakkaat/omaisuus/sijoitukset/virtuaalivaluutat/)
##

**Q:** Help my CSV is incorrectly!

**A:** Currently only Coinbase, Coinbase Pro, Nordnet and Degiro are supported as source of CSV files. If you have more complex transactions than there are tests for, please open a [issue](https://github.com/jaantaponen/verotunkki/issues/new)!
##

**Q:** I want to help out, what can I do?
**A:** I would be so happy if you could help out! Writing more unit tests, improve the UI/UX. Fork the project and submit a PR!
##
const CC = require('currency-converter-lt')

let currencyConverter = new CC({amount:1})
  currencyConverter.currencyFrom = "INR"
  currencyConverter.currencyTo = "USD"
  async function test(){
    console.log("it is ",await currencyConverter.convert())
    }
    test()
    

// currencyValues = {}

// const currencyExchangeRates = async () => {
//   currencyConverter.currencyFrom = "INR"
//   currencyConverter.currencyTo = "USD"
//   currencyValues["USD"] = await currencyConverter.convert()
//   currencyConverter.currencyFrom = "INR"
//   currencyConverter.currencyTo = "EUR"
//   currencyValues["EUR"] = await currencyConverter.convert()
//   currencyConverter.currencyFrom = "INR"
//   currencyConverter.currencyTo = "AED"
//   currencyValues["AED"] = await currencyConverter.convert()
    
//   return currencyValues
// }

// currencyExchangeRates()


// const available_currencies = {
// "INDIA":"INR",
// "USA":"USD",
// "EUROPE":"EUR",
// "UAE":"AED",
// }

// const exchange_rates = {
// "INR": 1,
// "USD": 0.012,
// "EUR": 0.011,
// "AED": 0.044
// }

// const currency_symbols = {
// "INR":"₹",
// "USD":"$",
// "EUR":"€",
// "AED":"AED"
// }


// module.exports = {available_currencies, exchange_rates, currency_symbols}
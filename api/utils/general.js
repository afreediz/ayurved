const { v4: uuidv4 } = require('uuid');
const CC = require('currency-converter-lt')

let currencyConverter = new CC({amount:1})
currencyValues = {}

const currencyExchangeRates = async () => {
  currencyValues['INR'] = 1
  currencyConverter.currencyFrom = "INR"
  currencyConverter.currencyTo = "USD"
  currencyValues["USD"] = await currencyConverter.convert()
  currencyConverter.currencyFrom = "INR"
  currencyConverter.currencyTo = "EUR"
  currencyValues["EUR"] = await currencyConverter.convert()
  currencyConverter.currencyFrom = "INR"
  currencyConverter.currencyTo = "AED"
  currencyValues["AED"] = await currencyConverter.convert()
  return currencyValues
}


const  generateUnique10DigitNumber = function() {
    // Generate a UUID and convert the first part to a number
    const uuid = uuidv4();
    const uniqueNumber = parseInt(uuid.replace(/-/g, '').substring(0, 10), 16);
    return uniqueNumber % 10000000000; // Ensure it's within 10 digits
  }

const getCurrentDateFormatted = function () {
    const date = new Date();
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
  
    return `${day}-${month}-${year}`;
  }

module.exports = { generateUnique10DigitNumber, getCurrentDateFormatted, currencyExchangeRates }
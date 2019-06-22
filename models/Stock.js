//Imports

const mongoose = require('mongoose');
const {Schema} = mongoose;

const stockSchema = new Schema({

    name: {
        type: String
    },
    numStocks: {
        type: Number
    },
    totalWorth: {
        type: Number,
        get: getPrice,
        set: setPrice
    }

})

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

const Stock = mongoose.model('StockItem', stockSchema);

module.exports = Stock;
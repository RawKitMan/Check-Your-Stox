//Imports

const mongoose = require('mongoose');
const {Schema} = mongoose;

const stockSchema = new Schema({

    name: {
        type: String
    },
    numShares: {
        type: Number
    },
    purchasePrice:{
        type: String
    },
    totalWorth: {
        type: Number
    }

});

const Stock = mongoose.model('StockItem', stockSchema);

module.exports = Stock;
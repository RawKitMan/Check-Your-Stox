//Importing the Stock model
const db = require('../models');

//Methods
module.exports = {
    saveStock: (req, res) => {
        db.Stock.create({
            name: req.body.name,
            numStocks: req.body.numStock,
            purchasePrice: req.body.purchasePrice,
            totalWorth: req.body.totalWorth
        })
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    },

    getPurchases: (req, res) => {
        db.Stock.find({})
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    },

    updateStock: (req, res) => {

    },

    deleteStock: (req, res) => {

    }
};
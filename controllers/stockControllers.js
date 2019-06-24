//Importing the Stock model
const db = require('../models');

//Methods
module.exports = {
    saveStock: (req, res) => {
        db.Stock.create({
            name: req.body.name,
            numShares: req.body.numStock,
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

    buyMoreShares: (req, res) => {
        console.log(req.body);
        db.Stock.findByIdAndUpdate(
            { _id: req.params.id },
            { numShares: req.body.totalShares},
            { new: true }
        )
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err));
    },

    sellStock: (req, res) => {
        db.Stock.findByIdAndDelete(
            {
                _id: req.params.id
            }
        )
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    }
};
//Importing the Stock model
const db = require('../models');

//Methods
module.exports = {
    saveStock: (req, res) => {
        db.Stock.create({
            name: req.body.name,
            numStocks: req.body.numStocks,
            totalWorth: req.body.totalWorth
        })
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    },

    getStocks: (req, res) => {
        db.Stock.find({})
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    },

    updateStock: (req, res) => {
        db.Stock.findByIdAndUpdate(
            { _id: req.params.id },
            { numStocks: req.body.numStocks },
            { totalWorth: req.body.totalWorth },
            { new: true }
        )
            .then(dbStock => res.json(dbStock))
            .catch(err => res.status(422).json(err))
    },

    deleteQuest: (req, res) => {

        db.Quest.findByIdAndDelete(
          {
            _id: req.params.id
          }
        )
        .then(dbQuest => res.json(dbQuest))
        .catch(err => res.status(422).json(err))
      }
};
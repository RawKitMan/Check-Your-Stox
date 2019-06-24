const express = require("express"),
    router = express.Router(),
    {stockControllers} = require('../controllers');

    router.route("/stocks").post(stockControllers.saveStock);
    router.route("/stocks").get(stockControllers.getPurchases)

// Exports:
module.exports = router;
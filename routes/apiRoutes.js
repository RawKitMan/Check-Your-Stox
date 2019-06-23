const express = require("express"),
    router = express.Router(),
    {stockControllers} = require('../controllers');

    router.route("/stocks").post(stockControllers.saveStock);

// Exports:
module.exports = router;
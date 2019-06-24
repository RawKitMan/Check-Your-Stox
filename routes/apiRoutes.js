//Get all the imports we need for the controller and router
const express = require("express"),
    router = express.Router(),
    { stockControllers } = require('../controllers');


//Set up the routes to the controller
router.route("/stocks").post(stockControllers.saveStock);
router.route("/stocks").get(stockControllers.getPurchases);
router.route("/stocks/:id").delete(stockControllers.sellStock);
router.route("/stocks/:id").put(stockControllers.buyMoreShares);

// Exports:
module.exports = router;
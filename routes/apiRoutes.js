//Get all the imports we need for the controller and router
const express = require("express"),
    router = express.Router(),
    { userControllers, stockControllers } = require('../controllers');

//Set up routes to the User controller methods

router.post("/users/login", userControllers.login);
router.route("/users/signup").post(userControllers.register);

//Set up the routes to the Stocks controller methods
router.route("/stocks").post(stockControllers.saveStock);
router.route("/stocks").get(stockControllers.getPurchases);
router.route("/stocks/:id").delete(stockControllers.sellStock);
router.route("/stocks/:id").put(stockControllers.buyMoreShares);

// Exports:
module.exports = router;
const express = require("express");

const shopRoutes = express.Router();

const productsController = require("../controllers/products");

shopRoutes.get("/", productsController.getProducts);

module.exports = shopRoutes;

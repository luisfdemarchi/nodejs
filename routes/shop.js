const express = require("express");
const path = require("path");

const shopRoutes = express.Router();

const adminData = require("./admin");

shopRoutes.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { products, pageTitle: "Shop", path: "/shop" });
});

module.exports = shopRoutes;

const express = require("express");
const {meals}= require("../controllers/meals.js");

const mealsRouter = express.Router();

mealsRouter.get("/mealslist", meals);

module.exports = mealsRouter;
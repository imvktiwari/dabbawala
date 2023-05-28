const express = require("express");
const Order = require("../models/Order.js");

const orderRouter = express.Router();
orderRouter.post("/order", async (req, resp) => {
    let data = new Order(req.body);
    let result = await data.save();
    // console.log("result")
    resp.send(result);
});

module.exports = orderRouter;
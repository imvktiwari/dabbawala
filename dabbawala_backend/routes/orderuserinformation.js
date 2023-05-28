const express = require("express");
const Order = require("../models/Order.js");

const userinformationRouter = express.Router();
userinformationRouter.get("/orderuserinformation/:email", async (req, resp) => {
    let data = await Order.find(req.params);
    resp.send(data);
    // console.log(data);
});

module.exports = userinformationRouter;
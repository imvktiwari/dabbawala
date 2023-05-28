const express = require("express");
const User = require("../models/User");

const userinformationRouter = express.Router();
userinformationRouter.get("/userinformation/:email", async (req, resp) => {
    let data = await User.findOne(req.params);
    resp.send(data);
    // console.log(data);
});

module.exports = userinformationRouter;
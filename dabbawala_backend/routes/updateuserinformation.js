const express = require("express");
const User = require("../models/User");

const updateuserinformationRouter = express.Router();
updateuserinformationRouter.put("/updateuserinformation/:email", async (req, resp) => {
    let data = await User.updateOne(
        req.params,
        { $set: req.body });

    resp.send(data);
    // console.log(data);
});

module.exports = updateuserinformationRouter;
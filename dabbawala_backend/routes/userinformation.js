const express = require("express");
const {userinformation}= require("../controllers/userinformation.js");

const userinformationRouter = express.Router();

userinformationRouter.get("/userinformation", userinformation);

module.exports = userinformationRouter;
const Meals = require("../models/Meals");

exports.meals = async (req, resp) => {
    let data = await Meals.find({});
    resp.send(data);
};

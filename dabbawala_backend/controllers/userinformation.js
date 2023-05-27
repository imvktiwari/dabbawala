const User = require("../models/User");

exports.userinformation = async (req, resp) => {
    let data = await User.find({});
    resp.send(data);
};

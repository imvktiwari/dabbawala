const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: "",
    },
});
module.exports = mongoose.model("meals", UserSchema);
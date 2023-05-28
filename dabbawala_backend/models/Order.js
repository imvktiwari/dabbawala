const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: "",
    }, 
    payment: {
        type: String,
        default: "",
    },
    ordereditems: { type: Array },
});
module.exports = mongoose.model("orders", OrderSchema);
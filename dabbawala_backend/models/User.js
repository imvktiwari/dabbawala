const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    workaddress: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    postalcode: {
        type: String,
        default: "",
    },
    phonenumber: {
        type: String,
        default: "",
    },
    orders: [
        {
            id: ObjectId,
        },
    ],
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("users", UserSchema);





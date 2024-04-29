const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName:String,
    email:String,
    googleId:String,
    image:String,
    accessToken:String
},{timestamps:true});

const userModel = mongoose.model("userData",userSchema);

module.exports = userModel;
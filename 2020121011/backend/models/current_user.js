const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const current_userschema = new Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:false
    },
    bookmark:{
        type:String,
        required:false,
        default:"yes"
    }
    
});
module.exports = Current_user= mongoose.model("Current_users", current_userschema);
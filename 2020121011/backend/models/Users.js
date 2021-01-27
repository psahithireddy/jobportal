const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	password:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true
	},
	instname:{
		type: String,
		required: true

	},
	endyear:{
		type: Number,
		required: false

	},
	startyear:{
		type: Number,
		required: true

	},
	
	skills:{
		type:String,
		required:false
	},
	Rating:{
		type:Number,
		required:false
	},
	//can add cv later
	date_of_joining:
    {
        type:Date,
        required:false,

	},
	duration:{
		type: String,
		required: false

	},
	date:{
		type: Date,
		required: false
	},
	noofapp:{
		type:Number,
		required: true
	},
	tenure:{
		type:String,
		required: true
	}
});

module.exports = User = mongoose.model("Users", UserSchema);

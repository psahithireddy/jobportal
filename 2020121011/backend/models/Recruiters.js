const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	contact:{
		type:Number,
		required:false
	},
	bio:{
		type:String,
		required:false
	}
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);
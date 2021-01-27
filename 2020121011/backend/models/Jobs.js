const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({  
    title:{
        type:String,
        required:true
    },
    recruiter_id:{
        type:String,
        required:true
    },
    recruiter_email:{
        type:String,
        required:true
    },
    recruiter_name:{
        type:String,
        required:true
    },
    max_applicants:{
        type:Number,
        required:true
    },
    //no.of openings
    max_positions:{
        type:Number,
        required:true 
    },
    date_of_posting:{
        type: Date,
		required: true
    },
    description:{
        type:String,
        required:false
    },
    //need to add time 
    deadline:{
        type: Date,
		required: true
    },
    Required_skillsets:{
        type:String,
        required:false
    },
    type_of_job:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    salary:{
        type     : Number,
        required : true,
        unique   : true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
        },
    rating:{
        type:Number,
        required:true
    },
   currentapplications:{
    type:Number,
    required:true
   },
   currentpositions:{
    type:Number,
    required:true

   },
    //to say if its deleted or active or deadline passed
    jobstatus:
    {
        type:String,
        required:false,
    }

   
});
module.exports = Job = mongoose.model("Jobs", JobSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Applicationschema = new Schema({  
    job_id:{
        type:String,
        required:false,
    },
    rec_id:{
        type:String,
        required:false,
    },
    app_id:{
        type:String,
        required:false,
    },
   
    
    ratethisapp:
    {
        type:Number,
        required:false

    },
    ratethisjob:
    {
        type:Number,
        required:false
    },
    status:{
        type:String,
        required:false,
    },
    sop:{
        type:String,
        required:false,
    },
    date_of_joining:
    {
        type:Date,
        required:false,

    },
    date_of_application:
    {
        type:Date,
        required:false,
    },
    //for recruiter display
    jobtype:{
        type:String,
        required:false,
    },
    jobtitle:{

        type:String,
        required:false,
    }, 
    name:{
        type:String,
        required:false,

    },
    ratingapp:{
        type:Number,
        required:false
    }
    


})
module.exports = Applications = mongoose.model("Applications", Applicationschema);

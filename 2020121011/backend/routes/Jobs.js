var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const Job = require("../models/Jobs");
const { route } = require("./Jobs");

// GET request 
// Getting all the jobs
router.get("/",function(req,res){
    Job.find(function(err,jobs){
        if(err)
        {
            console.log(err);
        }
        else{
            res.json(jobs);
        }
    })
});
router.post("/addjob",(req,res)=>{
    const newJob= new Job({
        title:req.body.title,
        description:req.body.description,
        recruiter_id:req.body.recruiterid,
        recruiter_email:req.body.recruiter_email,
        recruiter_name:req.body.recruiter_name,
        max_applicants:req.body.max_applicants,
        max_positions:req.body.max_positions,
        date_of_posting:req.body.date_of_posting,
        deadline:req.body.deadline,
        Required_skillsets:req.body.Required_skillsets,
        type_of_job:req.body.type_of_job,
        duration:req.body.duration,
        salary:req.body.salary,
        rating:req.body.rating,
        currentapplications:0,
        currentpositions:0,
        jobstatus:"active"

    });
    newJob.save()
        .then(job=>{
            res.status(200).json(job);
        })
        .catch(err=>{
            res.status(400).send(err);
        });
        

});

router.post("/incjobapp", (req, res) => {
    const query={"_id":req.body.job_id};
    const update={ "$inc":{"currentapplications":1}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return Job.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))

});

router.post("/incpos", (req, res) => {
    const query={"_id":req.body.job_id};
    const update={ "$inc":{"currentpositions":1}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return Job.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))

});

router.post("/decapp", (req, res) => {
    const query={"_id":req.body.job_id};
    const update={ "$inc":{"currentapplications":-1}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return Job.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))

});
router.post("/jobstatus", (req, res) => {
    const query={"_id":req.body.job_id};
    const update={ "$set":{"jobstatus":req.body.status}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return Job.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))

});

router.post('/editjob',(req, res) => {
    const query={"_id":req.body.id};
    const update={ "$set":{"max_applicants":req.body.maxapp,"max_positions":req.body.maxpos ,"deadline":req.body.deadline}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return Job.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {
        console.log(`Successfully updated document: ${updatedDocument}.`)
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))

    
})


router.post("/whatalljobs", (req, res) => {
	const id = req.body._id;
	console.log(id)
	Job.find({recruiter_id:id}).then(job => {
		// Check if id email exists
		if (!job) {
            console.log("no")
			return res.status(404).json({
				id: "Id not found",
            });
            
        }
        else{
            console.log("yes");
            res.json(job);
            
        }
    } 
    ).catch(function(error){console.log(error)})
    ;
});



router.post("/showjob", (req, res) => {
	const id = req.body._id;
	console.log(id)
	Job.findOne({_id:id}).then(job => {
		// Check if id  exists
		if (!job) {
            console.log("no")
			return res.status(404).json({
				id: "Id not found",
            });
            
        }
        else{
            console.log("yes");
            console.log(job)
            res.json(job);
            
        }
    } 
    ).catch(function(error){console.log(error)})
    ;
});
module.exports = router;
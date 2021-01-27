var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const App = require("../models/Applications");
const { route } = require("./Application");

router.get("/",function(req,res){
    App.find(function(err,jobs){
        if(err)
        {
            console.log(err);
        }
        else{
            res.json(jobs);
        }
    })
});

router.post("/addapplication",(req,res)=>{
    const newApp= new App({
       app_id:req.body.app_id,
       rec_id:req.body.rec_id,
       job_id:req.body.job_id,
       status:req.body.status,
       jobtitle:req.body.jobtitle,
       jobtype:req.body.jobtype,
       sop:req.body.sop,
       date_of_application:req.body.dap,
       name:req.body.name,
       ratethisapp:0,
       ratethisjob:0,
       ratingapp:req.body.rating
    });
    newApp.save()
        .then(app=>{
            res.status(200).json(app);
        })
        .catch(err=>{
            res.status(400).send(err);
        });
        

});
//get my employess
router.post("/getmyemp",(req,res)=>{
    App.find( {"rec_id":req.body.rec_id, "status":"accepted"} ).then(app=> {
        console.log("yesworking");
        res.json(app); //get applicant ids from it
        console.log(app)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});


//recruiters can see who all applied on a particulat job
router.post("/reclist",(req,res)=>{
    App.find( {"job_id":req.body.job_id} ).then(app=> {
        console.log("yesworking");
        res.json(app); //get applicant ids from it
        console.log(app)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

router.post("/applist",(req,res)=>{ //deadline check is is another post u basically evaluate both posts to find remaining jobs
    App.find( { "app_id":req.body.app_id } ).then(app=> {
        console.log("yes");
        res.json(app); //get job ids from it
        console.log(app)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});


router.post("/getdetails",(req,res)=>{
    
    App.aggregate([
        {
        $lookup:
        {
            from:"User",
            localField:"app_id",
            foreignField:"_id",
            as:"job_details"
        }},
        //{$unwind:"$job_details"},
        {$match:{"job_id":req.body.job_id}}
        ])
        .then(job_detail =>{
        console.log("success");
        res.json(job_detail)
    })
    .catch(err => {
        res.status(400).send(err);
        console.log("tch tch tch")
    });
});


router.post("/updatestatus",(req,res)=>{
            const query = {"app_id":req.body.app_id, "job_id":req.body.job_id };
        // Set some fields in that document
        const update = {
        "$set": {
            "status": req.body.status
        }
        };
        // Return the updated document instead of the original document
        const options = { returnNewDocument: true };
        return App.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {
            if(updatedDocument) {
            console.log(`Successfully updated document: ${updatedDocument}.`)
            } else {
            console.log("No document matches the provided query.")
            }
            return res.json(updatedDocument)
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))

});
//updating date of joining
router.post("/joined",(req,res)=>{
    const query = {"app_id":req.body.app_id, "job_id":req.body.job_id };
// Set some fields in that document
const update = {
"$set": {
    "date_of_joining":Date.now()
}
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return App.findOneAndUpdate(query, update, options)
.then(updatedDocument => {
    if(updatedDocument) {
    console.log(`Successfully updated document: ${updatedDocument}.`)
    } else {
    console.log("No document matches the provided query.")
    }
    return res.json(updatedDocument)
})
.catch(err => console.error(`Failed to find and update document: ${err}`))

});

router.post("/jobdelete",(req,res)=>{
    const query = {"job_id":req.body.job_id };
// Set some fields in that document
const update = {
"$set": {
    "status":"deleted"

}
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return App.updateMany(query, update, options)
.then(updatedDocument => {
    if(updatedDocument) {
        //then post to reflect changes in job schema ,but running avg on all applicants ratings on that job
    console.log(`Successfully updated document: ${updatedDocument}.`)
    } else {
    console.log("No document matches the provided query.")
    }
    return updatedDocument
})
.catch(err => console.error(`Failed to find and update document: ${err}`))

});
 


router.post('/permadelete',(req,res)=>{

    App.deleteOne({"app_id":req.body.app_id,"job_id":req.body.job_id})
    .then(res=>{console.log(res)})
    .catch(err => console.error('Failed'))
})



//rate a particular job in applicationa and update the overall rating

router.post("/updaterating",(req,res)=>{
    const query = {"app_id":req.body.app_id, "job_id":req.body.job_id };
// Set some fields in that document
const update = {
"$set": {
    "ratethisjob":req.body.rating
}
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return App.findOneAndUpdate(query, update, options)
.then(updatedDocument => {
    if(updatedDocument) {
        //then post to reflect changes in job schema ,but running avg on all applicants ratings on that job
    console.log(`Successfully updated document: ${updatedDocument}.`)
    } else {
    console.log("No document matches the provided query.")
    }
    return updatedDocument
})
.catch(err => console.error(`Failed to find and update document: ${err}`))

});



module.exports = router;


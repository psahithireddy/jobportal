var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
// Load Recruiter model
const Recruiter = require("../models/Recruiters");
const { route } = require("./Recruiters");
// GET request 
// Getting all the recruiters
router.get("/", function(req, res) {
    Recruiter.find(function(err, recruiters) {
		if (err) {
			console.log(err);
		} else {
			res.json(recruiters);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a recruiter to db
router.post("/register", (req, res) => {
    const newRecruiter = new Recruiter({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact:req.body.contact,
        bio:req.body.bio,
        type:req.body.type,
        date: req.body.date
    });
    console.log(req.body)
    newRecruiter.save()
        .then(recruiter=> {
            res.status(200).json(recruiter);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/updaterecruiter",(req, res)=>{
    const emailid=req.body.email;
    Recruiter.updateOne(
        {email:emailid},
        {
            $set:{"name":req.body.name}
        }
    ).then(recruiter=>{
        res.status(200).json(recruiter);
    })
    .catch(err => {
        res.status(400).send(err);
    });

    
});

router.post("/getrecbyid", (req, res) => {
	var Id = req.body.rec_id;
	Recruiter.findOne({_id:Id}).then(user => {
		// Check if user email exists
		if (!user) {
            console.log("no")
			return res.status(404).json({
				error: "Email not found",
            });
            
        }
        else{
            console.log("yes");
            res.json(user);
            
        }
	});
});


router.post("/updatedetails",(req,res)=>{
    
    const query = {"_id":req.body.id };
// Set some fields in that document
const update = {
"$set": {
    "name":req.body.name,
    "email":req.body.email,
    "contact":req.body.contact,
        "bio":req.body.bio
}
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return Recruiter.findOneAndUpdate(query, update, options)
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

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find recruiter by email
	Recruiter.findOne({ email }).then(recruiter => {
		// Check if recruiter email exists
		if (!recruiter) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.json(recruiter);
        }
	});
});

module.exports = router;


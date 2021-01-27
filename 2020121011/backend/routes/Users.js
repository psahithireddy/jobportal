var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

// Load User model
const User = require("../models/Users");
const { route } = require("./Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db


router.post("/register", (req, res) => {
    console.log(req.body)
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
       instname:req.body.instname,
       endyear:req.body.endyear,
       startyear:req.body.startyear,
       skills:req.body.skills,
    duration:null,
    tenure:req.body.tenure,
    noofapp:req.body.noofapp,
        type:req.body.type,
        date: req.body.date
    });
   
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/updatedetails",(req,res)=>{
    
    const query = {"_id":req.body.id };
// Set some fields in that document
const update = {
"$set": {
    "name":req.body.name,
    "email":req.body.email,
    "instname":req.body.instname,
    "endyear":req.body.endyear,
    "startyear":req.body.startyear,
    "skills":req.body.skills
    
}
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return User.findOneAndUpdate(query, update, options)
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
//insert duration and make tenure as yes and date of joining as today
router.post("/onacceptance", (req, res) => {
    
    const query={"_id":req.body.app_id};
    const update={ "$set":{"duration":req.body.duration,"tenure":"yes","date_of_joining":Date.now()}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return User.findOneAndUpdate(query, update, options)
    .then(updatedDocument => {
        if(updatedDocument) {

        console.log(`Successfully updated document: ${updatedDocument}.`)
        //send mail
        var receive=updatedDocument.email;
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '5422sarp@gmail.com',
              pass: 'sahithireddyplease'
            }
          });
          
          var mailOptions = {
            from: '5422sarp@gmail.com',
            to: receive,
            subject: 'Sending Email for Job Portal -Dass assgn1 - 2020121011',
            text: 'congratulations you have been selected!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        
        
        } else {
        console.log("No document matches the provided query.")
        }
        return res.json(updatedDocument);
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))
    
    
    
    
})

router.post("/changenoofjob", (req, res) => {
    const query={"_id":req.body.app_id};
    const update={ "$set":{"noofapp":req.body.noofapp}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return User.findOneAndUpdate(query, update, options)
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


router.post("/decnoofjob", (req, res) => {
    const query={"_id":req.body.app_id};
    const update={ "$inc":{"noofapp":-1}};
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return User.findOneAndUpdate(query, update, options)
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
router.post("/deletedjob", (req, res) => {
    const query={"_id":req.body.app_id};
    const update={ "$inc":{"noofapp":1},
    "$set":{"tenure":"no",
    "date_of_joining":null,
    "duration":null}
    };
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    return User.findOneAndUpdate(query, update, options)
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


    


router.post("/getuserbyid", (req, res) => {
	var Id = mongoose.Types.ObjectId(req.body.app_id);
	User.findOne({_id:Id}).then(user => {
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

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	console.log(email)
	User.findOne({ email }).then(user => {
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

module.exports = router;


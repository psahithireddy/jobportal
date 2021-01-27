var express = require("express");
var router = express.Router();

// Load Recruiter model
const Current_user = require("../models/current_user");
const { route } = require("./current_user");

router.get("/current_user",function(req, res){
    Current_user.find(function(err, current_user){
        if(err)
        {
            console.log(err);  
        }
        else {
            res.json(current_user);
        }
    })
});

router.post("/updateuser",(req,res)=>{
    Current_user.updateOne(
        {bookmark:"yes"},
        {
            $set:{"name":req.body.name , "email":req.body.email}
        }
    ).then(current_user=>{
        res.status(200).json(current_user);
    })
    .catch(err => {
        res.status(400).send(err);
    });


});
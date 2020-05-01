var express = require("express");

router=express.Router(),
passPort=require("passport"),
User=require("../models/user");



router.get("/",function(req,res){
  
    res.render("landing");

});



//Auth Routes
//show register form
router.get("/register",function(req,res){
    res.render("register");
});

//register logic
router.post("/register",function(req,res){

    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passPort.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");

        });
    });
   
});

//login show form

router.get("/login",function(req,res){
    res.render("login");
});


//login logic

router.post("/login",passPort.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});



module.exports=router;


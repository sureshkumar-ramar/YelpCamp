var express = require("express");

router=express.Router();

var Campground=require("../models/campground");
var Comment =require("../models/comment");
var middleware=require("../middleware");



//show all campgrounds

router.get("/",function(req,res){

    Campground.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
        }

    });
});



router.post("/",middleware.isLoggedIn,function(req,res)
{
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCamp={name:name,image:image,description:description,author:author};
    //campgrounds.push(newCamp);
    //create campground and save to DB
    Campground.create(newCamp,function(err,newlyCreated){
        if(err)
        {
            console.log(err);

        }
        else
        {
            console.log("newly created campground:"+ newlyCreated)
            res.redirect("campgrounds");
        }

    });
    
    


});

router.get("/new",middleware.isLoggedIn,function(req,res)
{

    res.render("campgrounds/new");

});

//show more info about campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround)
    {
        if(err)
        {
            console.log(err);
        }
        else{

            res.render("campgrounds/show",{campground:foundCampGround});
        }

    });
    
});

//edit 
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req,res)
{
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});

      });
    
});

//update campground
router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    
            res.redirect("/campgrounds/"+req.params.id);
    });

});

//delete campground

router.delete("/:id", middleware.checkCampgroundOwnership ,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){

            res.redirect("/campgrounds");
    
    });
});







module.exports=router;
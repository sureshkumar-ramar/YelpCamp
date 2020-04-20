var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    seedDB=require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp",({useNewUrlParser:true,useUnifiedTopology:true}));

//seedDB();


// Campground.create(
//     {
//         name:"Granite Hill",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg",description:"This is a huge campground"
//     },function(err,campground)
//     {
//         if(err)
//         {
//             console.log(err);

//         }
//         else
//         {
//             console.log(campground);
//         }

//     }
// );






app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");



app.get("/",function(req,res){
  
    res.render("landing");

});

app.get("/campgrounds",function(req,res){

    Campground.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{campgrounds:allCampgrounds});
        }

    });

    //res.render("campgrounds",{campgrounds:campgrounds});

});

app.post("/campgrounds",function(req,res)
{
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var newCamp={name:name,image:image,description:description};
    //campgrounds.push(newCamp);
    //create campground and save to DB
    Campground.create(newCamp,function(err,newlyCreated){
        if(err)
        {
            console.log(err);

        }
        else
        {
            res.redirect("campgrounds");
        }

    });
    
    


});

app.get("/campgrounds/new",function(req,res)
{

    res.render("new");

});

//show more info about campground
app.get("/campgrounds/:id",function(req,res)
{
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampGround)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(foundCampGround);

            res.render("show",{campgound:foundCampGround});
        }

    });
    
})
app.listen(3000,function()
{
    console.log("YelpCamp Started");
});
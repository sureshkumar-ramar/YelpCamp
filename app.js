var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passPort=require("passport"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user")
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp",({useNewUrlParser:true,useUnifiedTopology:true}));

//passport configuration
app.use(require("express-session")({
    secret:"welcome to yelp camp",
    resave:false,
    saveUninitialized:false
}));
app.use(passPort.initialize());
app.use(passPort.session());
passPort.use(new LocalStrategy(User.authenticate()));
passPort.serializeUser(User.serializeUser());
passPort.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
app.locals.currentUser=req.user;
next();
});



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
app.use(express.static(__dirname+"/public"));



app.get("/",function(req,res){
  
    res.render("landing");

});

//show all campgrounds

app.get("/campgrounds",function(req,res){

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

    res.render("campgrounds/new");

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

            res.render("campgrounds/show",{campground:foundCampGround});
        }

    });
    
});

app.get("/campgrounds/:id/comments/new", isLoggedIn ,function(req,res){

    Campground.findById(req.params.id,function(err,foundground){

        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundground});
        }

    });     
   
});


app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err,campground){

        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }else
        {

            Comment.create(req.body.comment,function(err,createdComment){

                if(err){
                    console.log(err);
                    
                }
                else{
                    campground.comments.push(createdComment);
                    campground.save();
                    console.log(campground);
                    console.log(createdComment);
                    res.redirect("/campgrounds/"+campground._id);
                }

            });

        }        

    });

});

//Auth Routes
//show register form
app.get("/register",function(req,res){
    res.render("register");
});

//register logic
app.post("/register",function(req,res){

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

app.get("/login",function(req,res){
    res.render("login");
});


//login logic

app.post("/login",passPort.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){

});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000,function()
{
    console.log("YelpCamp Started");
});
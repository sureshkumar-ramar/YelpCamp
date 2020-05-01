var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passPort=require("passport"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user")
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds"),
    methodOverride=require("method-override");

mongoose.connect("mongodb://localhost/yelp_camp",({useNewUrlParser:true,useUnifiedTopology:true}));

app.use(methodOverride("_method"));
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

var commentRoutes = require("./routes/comments"),
campgroundRoutes= require("./routes/campgrounds"),
authRoutes = require("./routes/index");



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

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);



app.listen(3000,function()
{
    console.log("YelpCamp Started");
});
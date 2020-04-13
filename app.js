var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

var campgrounds=[
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Mountain Goot's Rest",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Mountain Goot's Rest",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"},
{name:"Mountain Goot's Rest",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173297dd09f4fc2_340.jpg"}
];

app.get("/",function(req,res){
  
    res.render("landing");

});

app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});

});

app.post("/campgrounds",function(req,res)
{
    var name=req.body.name;
    var image=req.body.image;
    var newCamp={name:name,image:image};
    campgrounds.push(newCamp);
    
    res.redirect("campgrounds");


});

app.get("/campgrounds/new",function(req,res)
{
    res.render("new");

});

app.listen(3000,function()
{
    console.log("YelpCamp Started");
});
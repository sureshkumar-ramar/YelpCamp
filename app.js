var express=require("express");
var app=express();
app.set("view engine","ejs");

var campgrounds=[
{name:"Salmon Creek",image:"https://www.photosforclass.com/download/pixabay-1149402?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d297ed2944cc05c_1280.jpg&user=Free-Photos"},
{name:"Granite Hill",image:"https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7d297ed2944cc05c_1280.jpg&user=FabricioMacedoPhotos"},
{name:"Mountain Goot's Rest",image:"https://www.photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d297ed2944cc05c_1280.jpg&user=Ben_Frieden"}
];

app.get("/",function(req,res){
  
    res.render("landing");

});

app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});

});

app.listen(3000,function()
{
    console.log("YelpCamp Started");
});
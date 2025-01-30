const express=require("express");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");



const app=express();
const port=8080;


app.use(methodOverride('_method'));

//setup for ejs

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//setup for public folder

app.use(express.static(path.join(__dirname,"public")));


//parsing post data
app.use(express.urlencoded({extended:true}));


//creating db and using let keyword bcoz when we use const keyword,we cant apply delete opreations in our posts array of objects. 
let posts=[
    {
        id:uuidv4(),
        username:"sunny",
        content:"i love coding websites"
    },
    {

        id:uuidv4(),
        username:"sinu",
        content:"i love designing websites"
    },
    {
        
        id:uuidv4(),
        username:"rahul",
        content:"i love damaging websites"
    }

];
//req response

app.get("/",(req,res)=>{
   console.log("req recieved")
})


//index route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
 })

 //creating form and adding it to post array

 app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
 })

 //add this to array with post request
 app.post("/posts",(req,res)=>{
   let {username,content}= req.body;
   let id=uuidv4();
  
    //creating unique id

   posts.push({id,username,content});
//    res.send("added post");
res.redirect("/posts"); //redirecting to main page

 })

 //view route
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
 res.render("show.ejs",{post});
})
 


 //creating ids using uuid


 //update route use patch
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
})

//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("edit.ejs",{post});
    
})

//delete post 
app.delete("/posts/:id",(req,res)=>{
let {id}=req.params;
 posts=posts.filter((p)=>id!==p.id);
res.redirect("/posts");

})
 

 app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
})
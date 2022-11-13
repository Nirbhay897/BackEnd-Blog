const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));


const homeStartingContent = "This is a blog page , you can write here, read other people posts and you yourself can add amazing stuff to this blog post the uploaded content can only be deleted by the creater of this blog , For adding the stuff, all you have to do is to click on the compose then you have to type the title and then the content related to it then you have to click on publish and then your article is published"

const aboutContent = "I have made this project with nodejs, express.js, mongodb, EJS tempelate, and several pakages, this is one of my amazing projects which I have made, while taking a Online course, I have added few things to it , on the basis of what I have learned in that course, I believe in learning by building projects"

const ConContent = "I am Nirbhay, 2nd year COE student at DTU, currently knows technologies like Nodejs, Express.js, React.js, MongoDB, EJS tempelates, Feel free to connect on linkeIn: https://www.linkedin.com/in/nirbhay-gupta-762143226 , Insta: nirbhaygupta80 "


// connecting to the new database 
mongoose.connect("mongodb+srv://NirbhayGupta:Nirbhay1234@cluster0.xqbm8tg.mongodb.net/blogDb" , {useNewUrlParser: true});

// creating schema for posts
const postSchema = {
    title: String,
    content: String
};

// creating a new model
const Post = mongoose.model("Post", postSchema);



app.get("/", function(req, res){

    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        }
        else{
            res.render("home", {StartingContent:homeStartingContent, posts:posts});
        }
    })
});

app.get("/About", function(req, res){
    res.render("about", { About:aboutContent});
});

app.get("/Contact", function(req, res){
    res.render("contact", { Contact:ConContent});
});

app.get("/compose", function(req, res){
    res.render("compose")
});


app.post("/compose", function(req, res){

    // creating new posts
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody,
        type: req.body.type
    });
    post.save(function(err){
        if(!err){
            res.redirect("/");
            console.log("saved to db");
        }
    });
});

// express routing parameters
app.get("/posts/:postId", function(req,res){

    const getId = req.params.postId;

    Post.findOne({_id:getId}, function(err, post){
        if(err){
            console.log(err);
        }
        else{
            res.render("post", {
                dynamic:post.title,
                dynamicContent:post.content
             });
        }
    });
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port , function(){
    console.log("Server has started")
});
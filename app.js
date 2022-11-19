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
    content: String,
    type: Number
};

// creating a new model
const Post = mongoose.model("Post", postSchema);
const PostSo = mongoose.model("PostSo", postSchema);
const PostE = mongoose.model("PostE", postSchema);



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


app.get("/society", function(req, res){

    PostSo.find({}, function(err, postSos){

        if(err){
            console.log(err);
        }
        else{
         res.render("society", {postSos:postSos});
        }
    })
});
app.get("/exam", function(req, res){

    PostE.find({}, function(err, postEs){

        if(err){
            console.log(err);
        }
        else{
         res.render("exam", {postEs:postEs});
        }
    })
});

app.get("/Contact", function(req, res){
    res.render("contact", { Contact:ConContent});
});

app.get("/compose", function(req, res){
    res.render("compose")
});


app.post("/compose", function(req, res){

    var type = req.body.tom
    console.log(type);

    if(type == 3){

        const post = new Post({
            title: req.body.postTitle,
            content: req.body.postBody,
        });
        
        post.save(function(err){
            if(!err){
                    res.redirect("/");
                    console.log("saved to home db");  
            }
        });
    }

    else if(type == 1){

        const postSo = new PostSo({
            title: req.body.postTitle,
            content: req.body.postBody,
        });

        postSo.save(function(err){
            if(err){
                     
                    console.log(err);
            }
            else{
                res.redirect("/society");
                console.log("saved to home db"); 
            }
        });
    }
    else if(type == 2){

        const postE = new PostE({
            title: req.body.postTitle,
            content: req.body.postBody,
        });

        postE.save(function(err){
            if(!err){
                    res.redirect("/exam");
                    console.log("saved to home db");  
            }
        });
    }
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
                dynamicContent:post.content,
             });
        }
    });

});

app.get("/postSos/:postSoId", function(req,res){

    const getId = req.params.postSoId;

    PostS.findOne({_id:getId}, function(err, postSo){
        if(err){
            console.log(err);
        }
        else{
            res.render("postSo", {
                dynamic:postSo.title,
                dynamicContentS:postSo.content,
             });
        }
    });
});

app.get("/postEs/:postEId", function(req,res){

    const getId = req.params.postEId;

    PostE.findOne({_id:getId}, function(err, postE){
        if(err){
            console.log(err);
        }
        else{
            res.render("postE", {
                dynamic:postE.title,
                dynamicContentE:postE.content,
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
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));


const homeStartingContent = "nfuwefidsnvdbuds fewf9 m mfhew9 h gh e9wmh hm gh8 nig gnd ilm ewife g   gmuh gweiog heogimwehg vn dmovhn w d  v; srmgievmu m  mg mgm ;eowgifm m ghiog;sdovinm m ew iom moi m;f iehm ih;weiofhvidsovhnsdoivm  hfm ihf im h w;fwefihmfds mfhm"

const aboutContent = "kfnk fkefmkm fmeow mfkm femm fkmfk ek fmkfmkg mgem regm erglm rk erm gerkigmeriogermg;oigmfiogersg;eoi gherj gue.rgn ugilern gergi; erngioeh;n ig n;g ;ngre iogrng eifewnew ;foi go enwfio ewgnd osjg.ngegunef nge;gneiroeg gi ngire n"

const ConContent = "kfnk fkefmkm fmeow mfkm femm fkmfk ek fmkfmkg mgem regm erglm rk erm gerkigmeriogermg;oigmfiogersg;eoi gherj gue.rgn ugilern gergi; erngioeh;n ig n;g ;ngre iogrng eifewnew ;foi go enwfio ewgnd osjg.ngegunef nge;gneiroeg gi ngire n"


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


app.listen(3001, function(){
    console.log("port is running at 3001")
});
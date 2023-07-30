//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const homeStartingContent = "👋 Hello and welcome to Daily Journal, the best website for writing and sharing your thoughts, feelings, and experiences.📝Daily Journal is more than just a website. It is a for people who love writing and sharing their lives. It is a platform where you can express yourself freely and creatively. It is a tool where you can learn more about yourself. 🌎";
const aboutContent = " Daily Journal is a website that helps you write and share your thoughts, feelings, and experiences.It is founded in 2023 by a passionate writer and developer who wanted to create a platform where anyone can write and share their journals online.🙌Daily Journal is more than just a website. It is a community of people who love writing and sharing their lives. Join us today and start your writing journey! 😊";
const contactContent = "👋 Hello, dear reader! We value your feedback and suggestions. If you have any questions, comments, or ideas for us, please feel free to contact us. You can fill out the form below or send us an email at contact@dailyjournal.com. We will get back to you as soon as possible. 😊Thank you for choosing our daily journal website. We hope you enjoy reading our content and join our community of loyal readers.🙌Happy journaling! 📚";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

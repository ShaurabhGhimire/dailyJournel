const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
var posts = [];

const homeStartingContent = "CanAstonish was established with the motto of freedom in writing. As the name suggests everyone can write and astonish their viewers. You can write and astonish too. To submit your own articles and build your own writing career please go to About Us tab and fill up a form where your application will be reviewed by experienced writers and you will receive your user id which can be used to publish articles here. Good Luck :)";
const contactContent="We are here to help you in every difficulty you face in this site. Feel free to send your feedback.";
const aboutContent = "We are a team of skilled writers, who likes to express their views, share their knowledge and experiences freely.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home", {
		homeStartingContent: homeStartingContent,
		posts: posts,
	});
});
app.get("/about", (req, res) => {
	res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
	res.render("contact", { contactContent: contactContent });
});
app.get("/compose", (req, res) => {
	res.render("compose");
});
app.get("/posts/:headTitle", (req, res) => {
	const requestedTitle = _.lowerCase(req.params.headTitle);

	posts.forEach((post) => {
		const storedTitle = _.lowerCase(post.title);

		if (requestedTitle === storedTitle) {
			res.render("post", { title: post.title, content: post.content });
		}
	});
});
app.post("/compose", (req, res) => {
	var post = {
		title: req.body.postTitle,
		content: req.body.postBody,
	};
	posts.push(post);
	res.redirect("/");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});

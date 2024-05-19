import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "What is Phishing and how to identify it?",
    content:
      "Phishing is a method of making an attempt to collect personal information using deceptive e-mails and websites. Phishing is a cyber-attack that uses disguised email as a weapon. The goal is to trick the e-mail recipient into believing that the message is something they they require or need for instance a request from their bank, or a note from somebody in their company requesting to click a link or download an attachment.",
    author: "Tejas GB",
    date: "2024-05-19T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Write your code here//

//CHALLENGE 1: GET All posts

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});


// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  for (let obj of posts) {
    if (obj.id === id) {
      if (req.body.title) {
        obj.title = req.body.title;
      } if (req.body.content) {
        obj.content = req.body.content;
      } if (req.body.author) {
        obj.author = req.body.author;
      }
    }
  }
  res.json(post);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((p) => p.id === id);
  posts.splice(searchIndex, 1);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
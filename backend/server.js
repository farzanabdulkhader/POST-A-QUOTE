import express from "express";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "./utilities/FormatedDate.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = 3000;
const app = express();
const POSTS = [
  {
    id: "1a2b3c4d",
    title: "The Alchemist",
    quote:
      "It's the possibility of having a dream come true that makes life interesting.",
    author: "Paulo Coelho",

    time: "11:45 am, 2 Sep 2020",
  },
  {
    id: "5e6f7g8h",
    title: "To Kill a Mockingbird",
    quote:
      "You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.",
    author: "Harper Lee",

    time: "1:20 pm, 12 Mar 2021",
  },
  {
    id: "9i8j7k6l",
    title: "1984",
    quote: "War is peace. Freedom is slavery. Ignorance is strength.",
    author: "George Orwell",
    time: "10:00 am, 5 Nov 2022",
  },
  {
    id: "m5n4o3p2",
    title: "The Great Gatsby",
    quote:
      "So we beat on, boats against the current, borne back ceaselessly into the past.",
    author: "F. Scott Fitzgerald",
    time: "8:15 pm, 15 Jul 2023",
  },
  {
    id: "q1r2s3t4",
    title: "Pride and Prejudice",
    quote:
      "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.",
    author: "Jane Austen",
    time: "6:29 am, 16 May 2024",
  },
];

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your React frontend URL
    methods: "GET,POST,PATCH,DELETE",
  })
);
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.status(200).json({ posts: POSTS });
});

app.post("/post", (req, res) => {
  const { title, quote, author } = req.body;
  const newPost = {
    id: uuidv4(),
    title,
    quote,
    author,
    time: formatDate(new Date()),
  };
  POSTS.push(newPost);
  res.status(201).json({ message: "Created new post.", post: newPost });
});

app.patch("/posts", (req, res) => {
  const { title, quote, author } = req.body;
  const { id } = req.query;

  const postIndex = POSTS.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  POSTS[postIndex] = {
    ...POSTS[postIndex],
    title,
    quote,
    author,
    time: formatDate(new Date()),
  };
  res.status(200).json({ message: "Post updated", post: POSTS[postIndex] });
});

app.delete("/posts", (req, res) => {
  const { id } = req.query;
  const postIndex = POSTS.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  POSTS.splice(postIndex, 1);
  res.status(200).json({ message: "Post deleted" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

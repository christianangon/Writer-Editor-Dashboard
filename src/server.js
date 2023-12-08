/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-12-07 17:55:53
 * @LastEditTime: 2023-12-07 17:56:01
 * @LastEditors: Ian
 */
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock database
const db = {
  companies: [],
  users: [],
  articles: [],
};

// Routes

// Get all companies
app.get("/companies", (req, res) => {
  res.json(db.companies);
});

// Get all users
app.get("/users", (req, res) => {
  res.json(db.users);
});

// Get all articles
app.get("/articles", (req, res) => {
  res.json(db.articles);
});

// POST new article
app.post("/articles", (req, res) => {
  const newArticle = req.body;
  newArticle.id = db.articles.length + 1;
  db.articles.push(newArticle);
  res.json(newArticle);
});

// PUT (update) article
app.put("/articles/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const updatedArticle = req.body;
  const index = db.articles.findIndex((article) => article.id === articleId);

  if (index !== -1) {
    db.articles[index] = { ...db.articles[index], ...updatedArticle };
    res.json(db.articles[index]);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

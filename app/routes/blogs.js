const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js");
const blog = require("../models/blog");


router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getBlog, (req, res) => {
  res.json(res.blog);
});

router.post("/", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    category: req.body.category,
    img: req.body.img,
    author: req.body.author,
    description: req.body.description,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }
  if (req.body.category != null) {
    res.blog.category = req.body.category;
  }
  if (req.body.img != null) {
    res.blog.img = req.body.img;
  }
  if (req.body.description != null) {
    res.blog.description = req.body.description;
  }
  if (req.body.author != null) {
    res.blog.author = req.body.author;
  }

  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getBlog, async (req, res) => {
  try {
    await res.blog.remove();
    res.json({ message: "Blog Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: "Cannot find blog" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  next();
}

module.exports = router;

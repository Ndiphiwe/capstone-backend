const Blog = require("../models/blog");

getBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findById(req.params._id);
    if (blog == null) {
      return res.status(404).json({ message: "cannot find blog" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.blog = blog;
  req.comment = decoded.comment;
  next();
};

module.exports = getBlog;

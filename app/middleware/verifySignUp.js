const User = require("../models/user");

// function name speaks for itself
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ name: req.body.name });
    email = await User.findOne({ email: req.body.email });
    if (user || email) {
      return res
        .status(404)
        .send({ message: "Username or email already exists." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

module.exports = checkDuplicateUsernameOrEmail;
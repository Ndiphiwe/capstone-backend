const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

const checkDuplicateUsernameOrEmail = require("../middleware/verifySignUp");

router.get("/", (req, res) => {
    res.send("Hey there... welcome to my blog API")
});

router.post("/signup", checkDuplicateUsernameOrEmail, controller.signup);

router.post("/signin", controller.signin);

module.exports = router;

// require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());
const blogsRouter = require("./app/routes/blogs");
app.use("/blogs", blogsRouter);
const usersRouter = require("./app/routes/user");
app.use("/users", usersRouter);
// const signupRouter = require("./app/routes/user");
// app.use("/signup", signupRouter);

const commentsRouter = require("./app/routes/comments");
app.use("/comments", commentsRouter);

app.listen(process.env.PORT || 3700, () => console.log("Server Started"));

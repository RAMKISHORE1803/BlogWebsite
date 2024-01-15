const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "ifeifsifsjwnrhbhjv";
const cookieParser = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://admin:0123456789@cluster0.sxoweqm.mongodb.net/"
);

// registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    // User already exists
    return res
      .status(400)
      .json({ message: "User already exists, Try signing in" });
  }

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Registration failed" });
  }
});

//login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) {
    // User does not exist
    return res.status(400).json({ message: "User not found, Please Register" });
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // Logged in successfully
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    // Wrong password
    res.status(400).json({ message: "Please check your credentials" });
  }
});

//check if loggedin
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//log out the user
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//creating a new post
app.post("/post", (req, res) => {});

//Starting server
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}.`);
});

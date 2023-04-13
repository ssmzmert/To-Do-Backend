require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json());
app.use(cors());

let users = [
  // {
  //   email: "johndoe@gmail.com",
  //   password: "password",
  //   todo: [],
  // },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const existingUser = users.find((user) => user.email === req.body.email);
    if (existingUser) {
      return res.status(409).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };
    console.log("user created", user);
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  console.log("user:", user);
  console.log("password:", req.body.password);

  if (!user) {
    return res.status(400).send("Cannot find user");
  }

  try {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("passwordMatch:", passwordMatch);

    if (passwordMatch) {
      const userInfo = { email: user.email };
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
      console.log(accessToken);
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send();
  }
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(users.filter((post) => post.email === req.user.email));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("err", err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/todo", authenticateToken, (req, res) => {
  const user = users.find((user) => user.email === req.user.email);
  if (!user) {
    return res.status(400).send("Cannot find user");
  }

  const newTask = {
    picture: null,
    file: null,
    title: req.body.title,
    description: req.body.description,
  };
  console.log(user);
  user.todo.push(newTask);
  console.log("new task added:", newTask);
  res.status(201).send();
});

app.listen(4000);

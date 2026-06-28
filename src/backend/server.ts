import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.get("/register", (req, res) => {
  res.send("fitur segera dibuat");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

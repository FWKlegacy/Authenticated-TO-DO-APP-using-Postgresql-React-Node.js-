const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Get all todos
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const todos = await pool.query("SELECT * FROM todos WHERE user_email =$1", [
      userEmail,
    ]);
    res.json(todos.rows);
  } catch (err) {
    console.log(err);
  }
});

//create new Todo
app.post("/todos", async (req, res) => {
  const id = uuidv4();
  const { user_email, title, progress, date } = req.body;

  try {
    const newTodo = await pool.query(
      "INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)",
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err);
  }
});

//Edit Todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editTodo = await pool.query(
      "UPDATE todos SET user_email =$1, title =$2, progress =$3, date =$4 WHERE id =$5;",
      [user_email, title, progress, date, id]
    );
    res.json(editTodo);
  } catch (err) {
    console.error(err);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id =$1;", [
      id,
    ]);
    res.json(deleteTodo);
  } catch (err) {
    console.error(err);
  }
});

//SIGNUP ROUTE

app.post("/signup", async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  const saltRounds = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    const userExists = await pool.query("SELECT FROM users WHERE email =$1;", [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User Already exists" });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    //insert new user

    const newUser = await pool.query(
      "INSERT INTO users (email,password) VALUES($1,$2)",
      [email, hashedPassword]
    );
    if (newUser) return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

/// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    // Check if user exists
    if (user.rows.length === 0)
      return res.status(400).json({ detail: "User does not exist" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    // Generate a JWT token
    const JWT_SECRET = process.env.JWT;
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "Logged in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

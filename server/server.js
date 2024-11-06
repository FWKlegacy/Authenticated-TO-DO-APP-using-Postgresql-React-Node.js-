const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

/* app.get("/", (req, res) => {
  res.send("Brevian");
}); */

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
  const { email, password } = req.body;
  try {
    const saltRounds = 10;
    const userExists = await pool.query("SELECT FROM users WHERE email =$1;", [
      email,
    ]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User Already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //insert new user

    const newUser = await pool.query(
      "INSERT INTO users (email,password) VALUES($1,$2) RETURNING *",
      [email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "user created successfully", user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

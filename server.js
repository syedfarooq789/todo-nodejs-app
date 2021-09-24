const express = require("express");
const app = express();
const todoController = require("./todoController");
const cors = require("cors");


app.use(cors());
app.use(express.raw({ type: "application/json" }));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true })); 

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/api/get/todolist", todoController.getTodoList);

app.post("/api/add/todoItem", todoController.addTodoItem);

app.put("/api/update/todoItem/:todoId", todoController.updateTodoItem);

app.delete("/api/delete/todoItem/:todoId", todoController.deleteTodoItem);

app.listen(5000, function () {
  console.log("Running on port 5000!");
});
module.exports = app;

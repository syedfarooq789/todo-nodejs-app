const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

// This function gets the list of object in the json file

exports.getTodoList = async (req, res) => {
  try {
    let todoListData = await fs.readFileSync(path.resolve(__dirname, "todolist.json"));
    let todoList = JSON.parse(todoListData);
    res.send(todoList);
  } catch (error) {
    console.log("Error", error);
  }
};

// This function adds object in the json file

exports.addTodoItem = async (req, res) => {
  try {
    let requestData = JSON.parse(req.body);
    let newTodoItem = {
      id: uuid(),
      todo: requestData.todo,
      status: requestData.status,
      description: requestData.description,
    };
    fs.readFile(
      path.resolve(__dirname, "todolist.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          let obj = JSON.parse(data); //now it an object
          obj.push(newTodoItem); //add some data
          let json = JSON.stringify(obj); //convert it back to json
          res.send(newTodoItem);
          fs.writeFile(
            path.resolve(__dirname, "todolist.json"),
            json,
            "utf8",
            (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
              } else {
                console.log(`File is written successfully!`);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

//This function updates the object status in json file

exports.updateTodoItem = async (req, res) => {
  try {
    var todoId = req.params.todoId;

    var requestData = JSON.parse(req.body);

    fs.readFile(
      path.resolve(__dirname, "todolist.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          let obj = JSON.parse(data);
          obj.map((item) => {
            if (item.id == todoId) {
              item.status = requestData.status;
              res.send(item);
              return item;
            }
          });
          let json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(
            path.resolve(__dirname, "todolist.json"),
            json,
            "utf8",
            (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
              } else {
                console.log(`File is written successfully!`);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

//This function deletes the object from the json file

exports.deleteTodoItem = async (req, res) => {
  try {
    var todoId = req.params.todoId;

    fs.readFile(
      path.resolve(__dirname, "todolist.json"),
      "utf8",
      (err, data) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          let obj = JSON.parse(data);
          obj = obj.filter((item) => {
            if (item.id != todoId) {
              return item;
            } else res.send(item);
          });
          let json = JSON.stringify(obj); //convert it back to json
          fs.writeFile(
            path.resolve(__dirname, "todolist.json"),
            json,
            "utf8",
            (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
              } else {
                console.log(`File is written successfully!`);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

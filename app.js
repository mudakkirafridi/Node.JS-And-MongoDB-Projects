const todo = require("./todo");

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    todo.addTodo(args[1]);
    break;
  case "list":
    todo.listTodos();
    break;
  case "delete":
    todo.deleteTodo(parseInt(args[1]));
    break;
  default:
    console.log(`
Usage:
  node app.js add "Task description"
  node app.js list
  node app.js delete <task_number>
`);
}

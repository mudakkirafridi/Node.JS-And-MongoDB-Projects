const fs = require('fs');
const file = "todos.json";

function loadTodos(){
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file , JSON.stringify([]));
    }
    const data = fs.readFileSync(file , 'utf-8');
    return JSON.parse(data);
}

function saveTodos(todos){
    fs.writeFileSync(file , JSON.stringify(todos , null , 2))
}

function addTodo(task){
    const todos = loadTodos();
    todos.push(task);
    saveTodos(todos);
    console.log(`Added ${task}`)
}

function listTodos (){
    const todos = loadTodos();
    if (todos.lenght === 0) {
        console.log(`No Task Found`);
        return ;
    }
    console.log('Your Todos:');
    todos.forEach((t,i)=> {
        console.log(`${i + 1} ${t}`);
    });


}

function deleteTodo(index){
    const todos = loadTodos();
    if (index < 1 || index > todos.lenght) {
        console.log('invalid index');
        return ;
    }
    const removed = todos.splice(index -1 , 1);
    saveTodos(todos);
    console.log(`Deleted ${removed[0]}`)
}

module.exports = {addTodo , listTodos , deleteTodo}
#!/usr/bin/env node

const args = process.argv;
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet')

deleteTodo = () => {
    getTodo();
    var questions = [{
        type: 'input',
        name: "item",
        message: "Enter the index number of the todo you want to delete: "
    }]
    inquirer.prompt(questions).then(deleteTodo => {
        var todos = getTodoP();
        for(var i=0 ; i<todos.length ; i++){
            if(i === deleteTodo.item - 1){
                todos.splice(i, 1);
            }
        }
        fs.writeFileSync("data.json", JSON.stringify(todos));
    }).catch((err) => {
        console.log(err);
    });
    
}

doneTodo = () => {
    getTodo();
    var questions = [{
        type: 'input',
        name: "item",
        message: "Enter the index of todo you have completed: "
    }]
    inquirer.prompt(questions).then(searchTodo => {
        var todos = getTodoP();
        for(var i=0 ; i<todos.length ; i++){
            if(i === searchTodo.item-1){
                todos[i].completed = true;
            }
        }
        fs.writeFileSync("data.json", JSON.stringify(todos));
    }).catch((err) => {
        console.log(err);
    });
}

getTodoP = () => {
    todos1 = fs.readFileSync("data.json").toString();
    todos2 = JSON.parse(todos1);
    return todos2;
}

getTodo = () => {
    todos1 = fs.readFileSync("data.json").toString();
    todos2 = JSON.parse(todos1);
    let index = 1;
    todos2.forEach(todo => {
        let todoText = chalk.magenta(`${index++}. ${todo.title}`)
        if(todo.completed === true){
            todoText += ' ✔ '
        }
        console.log(todoText)
    })
    return ;
}

addNewTodo = () => {
    var questions = [{
        type: 'input',
        name: "item",
        message: "Enter Todo: "
    }]

    inquirer.prompt(questions).then(todo => {
        var todoItem = {
            title: todo.item,
            completed: false
        }
        var todos = getTodoP();
        todos.push(todoItem);
        fs.writeFileSync("data.json", JSON.stringify(todos));
        
    }).catch((error) => {
        console.log(error);
    })
}

help = () => {
    console.log(chalk.blueBright(figlet.textSync("TODOJ CLI", {
        horizontalLayout: 'full',
        verticalLayout: 'default'
    }, function(err, data) {
        if(err){
            console.log(err);
        }
        console.log(data);
    })))
    console.log(chalk.red(`
        Command                 Usage`));
    console.log(chalk.green(`
        add                     Adds new Todo
        get                     See all Todos
        delete                  Delete Todo
        done                    Mark a todo complete
        help                    See the usage once again

                                ---Developed by Ninjavin
    `))
}

if(args.length == 2){
    help();
} else{
    switch(args[2]){
        case 'add': addNewTodo(); break;
        case 'delete': deleteTodo(); break;
        case 'done': doneTodo(); break;
        case 'get': getTodo(); break;
        case 'help': help(); break;
        default: console.log("Invalid Command Passed!"); help(); break;
    }
}

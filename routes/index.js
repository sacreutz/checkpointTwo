'use strict';

const express = require('express');
const router = express.Router();
// 🍓 it would be better to name this todos instead of database - it will make your code more semantic
const database = require('../models/todos')
const app = require('../app');
const bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//const routes = require("./routes/")


// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  // 🍓 this is an unnecessary operation because listPeople is already an array.
     let usersArray = [];

    const listPeople = database.listPeople();
    // 🍓 in general you will use res.json instead of res.send just because you can make sure that whatever you are sending back is in a universal format.  This is more of an fyi than a hard and fast rule
    res.send(listPeople);

  })

router.get('/:name/tasks', (req, res, next) => {

  const name = req.params.name
  // 🍓 if the name doesn't exist, this is where you would want to handle your error and send a 404 (not found) so that the rest of your code doesn't run:

  // if (name === undefined) {
  //   return res.sendStatus(404)
  // }

  const list = database.list(name);

  if (req.query.status === 'complete') {
    // 🍓 all of this would be cleaner/natural as a filter:
    //userTodos = userTodos.filter((todo) => todo.complete)

    let completedTasks = [];
    list.forEach(element => {
      if (element.complete === true) {

        completedTasks.push(element);
      }
    })

    res.send(completedTasks)


  } else if (req.query.status === 'active') {
    // 🍓 same comment as above - You could also reassign list so that you don;t have two res.sends with different variable names - see below this route for a more optimated compositoin 👇
    let unfinished = [];
    list.forEach(element => {
      if (element.complete === false) {
        unfinished.push(element)
      }
    })

    res.send(unfinished)

  } else {
    res.send(list)

  }

});


// 🍓 BETTER GET ROUTE:

// router.get('/:name/tasks', (req, res, next) => {
//   let userTodos = todos.list(req.params.name)
//   if (userTodos === undefined) {
//     return res.sendStatus(404)
//   }
// HERE WE ARE GOING TO MUTATE/REASSIGN userTodos IF THERE IS A QUERY - USE FILTER FOR THE CLEANEST CODE
//   if (req.query.status === 'complete') {
//     userTodos = userTodos.filter((todo) => todo.complete)
//   } else if (req.query.status === 'active') {
//     userTodos = userTodos.filter((todo) => !todo.complete)
//   }
//   res.json(userTodos)
// })






router.post('/:name/tasks', (req, res, next)  => {

    const name = req.params.name;
    // 🍓 below is simpler written:
    // if (!req.body.content)
    if (req.body.content.length === 0){
      //If you are sending a status use res.sendStatus for more semantic code
      res.send(400)
    } else {
     const add = database.add(name, req.body)
    const list = database.list(name)

// 🍓 This is a lot of white space
// to make your thoughts and code more clear it is incredibly important to format your code.  make sure it is indented properly and there is only spaces to divide information.  This makes this whole route very hard to reason about


  const newTask = list[list.length - 1]

   res.send(201, newTask)
  }
})

router.put('/users/:name/tasks', (req, res, next) => {
  const name = req.params.name
  const task = req.params.content
  // 🍓 useing es6 the above two lines could be written like this:
  // const { name, task } = req.params

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  const complete = database.complete(name, task)
// 🍓 don't leave console.logs in your submission code
console.log ('complete' + complete)
  res.redirect('/:name');
})

router.delete('/.')
// 🍓 here is what this route could look like:

// router.delete('/:name/tasks/:index', (req, res) => {
//   todos.remove(req.params.name, req.params.index)
//   res.sendStatus(204)
// })


module.exports = router;

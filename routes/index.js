'use strict';

const express = require('express');
const router = express.Router();
const database = require('../models/todos')
const app = require('../app');
const bodyParser = require('body-parser')
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//const routes = require("./routes/")


// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {

     let usersArray = [];

    const listPeople = database.listPeople();

    res.send(listPeople);

  })

router.get('/:name/tasks', (req, res, next) => {

  const name = req.params.name

  const list = database.list(name);

  if (req.query.status === 'complete') {
    let completedTasks = [];
    list.forEach(element => {
      if (element.complete === true) {

        completedTasks.push(element);
      }
    })

    res.send(completedTasks)


  } else if (req.query.status === 'active') {
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

router.post('/:name/tasks', (req, res, next)  => {

    const name = req.params.name;
    if (req.body.content.length === 0){
      res.send(400)
    } else {
     const add = database.add(name, req.body)
    const list = database.list(name)




  const newTask = list[list.length - 1]

   res.send(201, newTask)
  }
})

router.put('/users/:name/tasks', (req, res, next) => {
  const name = req.params.name
  const task = req.params.content
  const complete = database.complete(name, task)
console.log ('complete' + complete)
  res.redirect('/:name');
})

router.delete('/.')



module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const database = require('../models/todos')
const app = require('../app');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//const routes = require("./routes/")


// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  // try {
     let usersArray = [];
   // const names = Object.keys(tasks);
    const listPeople = database.listPeople();
    //const tasksArray = Object.keys(database.tasks);
    //console.log('listpeopel is' + listPeople)
    res.send(listPeople);

  })

router.get('/:name/tasks', (req, res, next) => {

  const user = [req.params.name]

  const list = database.list(user);
 res.send(list);
});

router.post('/:name/tasks', (req, res, next)  => {

    const name = req.params.name;
     const add = database.add(name, req.body)
    const list = database.list(name)
  console.log('body' + req.body)



  const newTask = list[list.length - 1]

   res.send(201, newTask)
 // }
})



module.exports = router;

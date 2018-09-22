'use strict';

const express = require('express');
const router = express.Router();
const database = require('../models/todos')

//const routes = require("./routes/")


// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  // try {
     let usersArray = [];
   // const names = Object.keys(tasks);
    const listPeople = database.listPeople();
    //const tasksArray = Object.keys(database.tasks);

    res.send(listPeople);
   // res.send(usersArray);

  //

  })


module.exports = router;

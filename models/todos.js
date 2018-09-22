'use strict';

let tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    let array = [];
    let tasksArray = Object.keys(tasks);
    for (let i = 0; i < tasksArray.length; i++){
      array.push(tasksArray[i]);
    }
    return array;
  },

  add: function (name, task) {
    // saves a task for a given person
    let taskArray = [];
   taskArray.push(task)
    if (!tasks[name]){
         tasks[name] = [task];
    } else {
        tasks[name].push(task);
    }


    tasks[name].forEach(task => {
      if (task.complete === undefined){
      task.complete = false;
      }
    })

    return taskArray;
  },

  list: function(name) {
    let nameArray = [];
    let tasksArray = Object.keys(tasks);
    console.log('tasksArray is' + tasksArray);
   for (let i = 0; i < tasksArray.length; i++){
      if (tasksArray[i] === name){

        nameArray = nameArray.concat(tasks[tasksArray[i]]);
        console.log('name array is' + nameArray);
      }
    }
    //console.log(nameArray);
    //return tasksArray;
    return nameArray;

  },

  complete: function(name, taskNumber){
          if (tasks[name][taskNumber].complete !== undefined){
          tasks[name][taskNumber].complete = true;
          } else {
           // tasks[name][taskNumber].complete = tasks[name][taskNumber].complete;
          }

    },

    remove: function(name, taskNumber){

      tasks[name].splice(taskNumber, 1);

    }


  }



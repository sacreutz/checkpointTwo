'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
module.exports = app; // this line is only used to make testing easier.
app.use("/users", require("./routes/"))

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());



// remember to plug in your router and any other middleware you may need here.

const router = express.Router();

module.exports = app;



if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.

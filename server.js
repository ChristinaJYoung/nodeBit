"use strict";

const express = require("express");
const app = express();
const sqlite3 = require('sqlite3');
const bodyParser = require("body-parser");
const db = new sqlite3.Database('lib/Nodebit.db');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/users", (req, res) => {

  db.all(`SELECT * FROM Users`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// Main route after login
app.get("/", (req, res) => {
  res.render("index");
});

// route for entering weight data
app.get("/weightinput", (req, res) => {
  res.render("weightinput");
});

// route for entering weight data
app.post("/weightinput", (req, res) => {
  console.log(req.body.weight);
  db.all(`INSERT INTO UserWeight VALUES(NULL, 1, ${req.body.weight}, date())`,
   (err, data) => {
    if (err) throw err;
    res.send("saved yo weight");
  });
});



app.listen(PORT, () =>{
  console.log(`App listening on port ${PORT}`);
});

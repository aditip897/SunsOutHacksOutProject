const express = require('express');
const app = express();
const port = 4300;
const path = require('path');
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header ('Access-Control-Allow-Methods', 'OPTIONS,POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('app/data/sqlitedb');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




require('./app/routes')(app, db);
app.use(express.static(path.join(__dirname,'frontEnd/public/html')));
app.use('/js', express.static(path.join(__dirname,'frontEnd/public/javascript')));
app.use('/css', express.static(path.join(__dirname,'frontEnd/public/css')));
app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});


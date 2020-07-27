const ejs = require("ejs");
const express = require("express");
const app = express()
const fetch = require('node-fetch');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/students', function (req, res) {
    res.render('students')
})

app.listen(8080, function () {                          //--- Connection to the server on the port 8080
    console.log('listening on port 8080')
})
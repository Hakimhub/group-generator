const ejs = require("ejs");
const express = require("express");
const app = express()
const fetch = require('node-fetch');
const path = require('path');
const url = "http://localhost:3000"

app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//STUDENT PAGE

app.get('/students', async function (req, res) {
    let studentList = await fetch(`${url}/students`);
    let jsonStudent = await studentList.json()
    
    res.render('students', {jsonStudent: jsonStudent})
})

app.post('/students', async function (req, res) {
    const name = req.body.name
    console.log(name)
     fetch(`${url}/students`, {method: 'POST', headers: {
        "Content-type": "application/json"
        //"Content-type": "application/json; raw"
    }, body: JSON.stringify({name: name})}).then(function () {
        
    })
    let studentList = await fetch((`${url}/students`));
    let jsonStudent = await studentList.json()
    res.render(`students`, {jsonStudent: jsonStudent})
})



//GROUP PAGE
app.get('/groups', async function (req, res) {
    let groupList = await fetch(`${url}/groups`)
    let jsonGroup = await groupList.json()

    res.render('groups', {jsonGroup: jsonGroup} )
})


app.listen(8080, function () {                          //--- Connection to the server on the port 8080
    console.log('listening on port 8080')
})
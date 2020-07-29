const ejs = require("ejs");
const express = require("express");
const app = express()
const fetch = require('node-fetch');
const path = require('path');
const { type } = require("os");
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
    }, body: JSON.stringify({name: name})})
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

app.post('/groups', async function (req, res) {
    const groupe =  req.body.groupe;
    const num = parseInt(req.body.nbr, 10)
    const list = await fetch(`${url}/students`);
    const jsonList = await list.json()
    let newGroup = {
        groupe: groupe,
        name: []
    }

    for (let i = 0; i < num; i ++) {
        let numRandom = Math.floor(Math.random() * (jsonList.length + 1))
        let getObj = jsonList[numRandom]
        newGroup.name.push(getObj.name)
    }
    fetch(`${url}/groups`, {method: 'POST', headers: {
        "Content-type": "application/json"
        //"Content-type": "application/json; raw"
    }, body: JSON.stringify(newGroup)})

    let groupList = await fetch(`${url}/groups`)
    let jsonGroup = await groupList.json()
    res.render('groups', {jsonGroup: jsonGroup} )
})



app.listen(8080, function () {                          //--- Connection to the server on the port 8080
    console.log('listening on port 8080')
})
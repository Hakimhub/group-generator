const ejs = require("ejs");             //-- I ask node.js to use EJS
const express = require("express");     //-- I ask nodes.js to use Express.js
const app = express()                   //--- I use express in my app variable (check express installation)
const fetch = require('node-fetch');    //-- I ask node.Js to use Fetch (fetch helps to get and send data from/to API)
const path = require('path');           //-- Help us use EJS with Express
const { type } = require("os");         //
const url = "http://localhost:3000"     //-- URL de notre API (index.js)

app.use(express.urlencoded({extended: true}))       //-- Help us read with express the data we will get from our API
app.use(express.static(__dirname));                 //-- Help us use CSS with Express 
app.set('views', path.join(__dirname, 'views'));    //-- Access the views directory (when we use express, EJS files are always in a "views" directory)
app.set('view engine', 'ejs');                      //--  Activate the reading of EJS pages that are in the views directory


//STUDENT PAGE

app.get('/students', async function (req, res) {    //-- We want to get the students names that are in the database and display them in the EJS file. When the localhost:8080/students is running, it runs the GET method
    let studentList = await fetch(`${url}/students`); //-- We create a studentList variable, with fetch we can access localhost:3000/students and store the data in the variable.
    let jsonStudent = await studentList.json()      //-- The studentList has a format that is not readable so we use .json() to read it as an array.
    
    res.render('students', {jsonStudent: jsonStudent}) //-- res.render send a response to the 8080 port. 'students' is the name of the EJS file that we want to display to localhost:8080/students. {jsonStudent: jsonStudent} is the array we just got and we send it as a variable jsonStudent to the EJS
})

app.post('/students', async function (req, res) {  //-- We want to send names to the database from the input of the page. So we will use a post method on the <form>
    const name = req.body.name                     //-- We get the input value of the form in the name variable with req.body.name                   
    console.log(name)
     fetch(`${url}/students`, {method: 'POST', headers: { //-- With POST method in fetch, we send the name to localhhost:3000/student. It will store the name in the database
        "Content-type": "application/json"
        //"Content-type": "application/json; raw"
    }, body: JSON.stringify({name: name})})               //-- The name is sent to the API, we use JSON.stringify because otherwise the name is not readable by the API (index.js)

    let studentList = await fetch((`${url}/students`));   //-- We create a studentList variable, with fetch we can access localhost:3000/students and store the data in the variable.
    let jsonStudent = await studentList.json()            //-- The studentList has a format that is not readable so we use .json() to read it as an array.
    res.render(`students`, {jsonStudent: jsonStudent})    //-- res.render send a response to the 8080 port. 'students' is the name of the EJS file that we want to display to localhost:8080/students. {jsonStudent: jsonStudent} is the array we just got and we send it as a variable jsonStudent to the EJS
})

 

//GROUP PAGE
app.get('/groups', async function (req, res) {          //-- We want to get the groups that are in the database and display them in the EJS file. When the localhost:8080/groups is running, it runs the GET method
    let groupList = await fetch(`${url}/groups`)        //-- We create a groupList variable, with fetch we can access localhost:3000/groups and store the data in the variable.
    let jsonGroup = await groupList.json()              //-- The groupList has a format that is not readable so we use .json() to read it as an array.

    res.render('groups', {jsonGroup: jsonGroup} )       //-- res.render send a response to the 8080 port. 'groups' is the name of the EJS file that we want to display to localhost:8080/groups. {jsonGroup: jsonGroup} is the array we just got and we send it as a variable jsonGroup to the EJS
})

app.post('/groups', async function (req, res) {         //-- We want to send group names and a precise number of names that are in the group to the database. We use POST method in the form
    const groupe =  req.body.groupe;                    //-- We get the input value of the form in the groupe variable with req.body.groupe 
    const num = parseInt(req.body.nbr, 10)              //-- We get the input value of the form in the num variable with req.body.nbr & with parseInt we change the string into a number "324" -> 324
    const list = await fetch(`${url}/students`);        //-- We create a list variable, with fetch we can access localhost:3000/students and store the data in the variable.
    const jsonList = await list.json()                  //-- The list variable has a format that is not readable so we use .json() to read it as an array.
    let newGroup = {                                    //-- We create a newGroup object. This object represent the structure of the object we add to the database
        groupe: groupe,
        name: []                                        //-- name's value is an empty array because we will push later student names in the array
    }

    for (let i = 0; i < num; i ++) { // For Loop: we use the for loop to get the number of names that we want in the group. While "i" is less than "num" variable, we continue to run the code 
        let numRandom = Math.floor(Math.random() * (jsonList.length)) //-- numRandom represent a random number between 0 and the number of student in our database
        let getObj = jsonList[numRandom]        //--We get a student randomly using the random number (numRandom) as an index of jsonList 

        newGroup.name.push(getObj.name)         //-- We push (send) the student that we pick randomly to the newGroup variable
    }
    fetch(`${url}/groups`, {method: 'POST', headers: { //-- With POST method in fetch, we send the groupe to localhhost:3000/groups. It will store the group in the database
        "Content-type": "application/json"
        //"Content-type": "application/json; raw"
    }, body: JSON.stringify(newGroup)})                //-- The group is sent to the API, we use JSON.stringify because otherwise the group is not readable by the API (index.js)

    let groupList = await fetch(`${url}/groups`)       //-- We create a groupList variable, with fetch we can access localhost:3000/groups and store the data in the variable.
    let jsonGroup = await groupList.json()             //-- The groupList has a format that is not readable so we use .json() to read it as an array.

    res.render('groups', {jsonGroup: jsonGroup} )      //-- res.render send a response to the 8080 port. 'groups' is the name of the EJS file that we want to display to localhost:8080/groups. {jsonGroup: jsonGroup} is the array we just got and we send it as a variable jsonGroup to the EJS
})



app.listen(8080, function () {                          //--- Connection to the server on the port 8080
    console.log('listening on port 8080')
})
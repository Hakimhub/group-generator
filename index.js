const MongoClient = require('mongodb').MongoClient;     //--- I ask mongodb to use a database
const url = "mongodb://localhost:27017/";               //--- Link i need to host my database 
const express = require('express');                     //--- I ask to my computer to use express in my code
const app = express();                                  //--- I use express in my app variable (check express installation)


app.use(express.urlencoded({extended: true}))
app.use(express.json())            // To read postman data otherwise it's undefined

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){  //--- Connect mongodb to my url and call a function that will do something in the database
    if (err) throw err;                                 //--- If there is an error with the database it will send "error" to the terminal
    let myTab;     
    let myGroupTab;                                     //--- Create a variable myTab with no value, the value will be defined later
    let mydb = db.db("mydb");                            //--- Define the name of the database we will use

    //GET STUDENTS
    app.get("/students",async function (req,res){          //---WE create a get request that use the route "/student". we get the data of mongodb student collection.  
    let getDB = await mydb.collection("Students").find({}).toArray() //---In the getDB variable we store the elements of the collection student in an Array. we use await to wait untill all the elements are stored before we move on.
    res.send(getDB)                                       //--- we send our elements that are in getDB to the '/students' route. we can see them in postman with get request.
})

    //DELETE STUDENTS
    app.delete('/students/:name',async function(req,res){
        const nom = req.params.name.toLowerCase()
        mydb.collection("Students").deleteMany({"name": nom})

    })

    //POST STUDENTS
    app.post("/students", function(req, res) {          //--- We create a "POST" request that will use the "localhost:3000/students" route and when we send a POST request in Postman, it run the function
        myTab = req.body.name                   //--- We define the value of myTab. req.body.name ==> The values we put in Postman ["hakim", "arthur", "lou", ...]
        console.log(myTab)                              
         mydb.collection("Students").insertOne({name: myTab.toLowerCase()}, function(err, res){ //--- We go into myTab to check every element in myTab and we send to the collection "Students" the elements in this form: {name: element}. The elements are now in our database in the Students collection
            if (err) throw err;                         //--- If there is an error with the database it will send "error" to the terminal
            console.log("Collection Students created!"); //--- If it worked we console.log this message
        })   
 })

    //GET GROUPS
    app.get("/groups",async function (req,res){           
        let getDB = await mydb.collection("Groups").find({}).toArray() 
        res.send(getDB)                                       
        })
    //GET GROUPS BY NAME
    app.get("/groups/:groupe", async function(req,res){
        let getOneDB = await mydb.collection("Groups").find({groupe: req.params.groupe}).toArray()
        res.send(getOneDB)
        console.log()
})



    
    //POST GROUPS
    app.post("/groups", function(req,res) {          
    myGroupTab = req.body.groupe                           
    console.log(myGroupTab)                              
    myGroupTab.forEach(element => mydb.collection("Groups").insertOne({groupe: element.toLowerCase()}, function(err, res){ 
        if (err) throw err;                         
        console.log("Collection Groups updated!"); 
    })   
)   
})

    //DELETE GROUPS
    app.delete('/groups/:groupe',async function(req,res){
        const groupe = req.params.groupe.toLowerCase()
        mydb.collection("Groups").deleteMany({"groupe": groupe})

    })


app.listen(3000, function () {                          //--- Connection to the server on the port 3000
    console.log('listening on port 3000')
})
       
});









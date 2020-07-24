const MongoClient = require('mongodb').MongoClient;     //--- I ask mongodb to use a database
const url = "mongodb://localhost:27017/";               //--- Link i need to host my database 
const express = require('express');                     //--- I ask to my computer to use express in my code
const app = express();                                  //--- I use express in my app variable (check express installation)


app.use(express.urlencoded({extended: true}))            // To read postman data otherwise it's undefined

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){  //--- Connect mongodb to my url and call a function that will do something in the database
    if (err) throw err;                                 //--- If there is an error with the database it will send "error" to the terminal
    let myTab;                                          //--- Create a variable myTab with no value, the value will be defined later
    let mydb = db.db("mydb");                            //--- Define the name of the database we will use

app.get("/students",async function (req,res){
    let getDB = await mydb.collection("Students").find({}).toArray()
    res.send(getDB)

})

    app.post("/students", function(req, res) {          //--- We create a "POST" command that will use the "localhost:3000/students" route and when we send a POST request in Postman, it run the function
        myTab = req.body.name                           //--- We define the value of myTab. req.body.name ==> The values we put in Postman ["hakim", "arthur", "lou", ...]
        console.log(myTab)                              
        myTab.forEach(element => mydb.collection("Students").insertOne({name: element}, function(err, res){ //--- We go into myTab to check every element in myTab and we send to the collection "Students" the elements in this form: {name: element}. The elements are now in our database in the Students collection
            if (err) throw err;                         //--- If there is an error with the database it will send "error" to the terminal
            console.log("Collection Students created!"); //--- If it worked we console.log this message
        })
        
    )
    
 })

    
app.listen(3000, function () {                          //--- Connection to the server on the port 3000
    console.log('listening on port 3000')
})
   
   
mydb.createCollection("Groups", function(err, res){   //--- Creating the collection "Groups" in our database "mydb"
       if (err) throw err;
       console.log("Collection Groups created!");
       
   });
    
});









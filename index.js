const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
    if (err) throw err;
   let dbo = db.db("mydb");
   let myobj = { name: "Hakim"}
   dbo.collection("Students").insertOne(myobj, function(err, res){
       if (err) throw err;
       console.log("Collection Students created!");

   })
   dbo.createCollection("Groups", function(err, res){
       if (err) throw err;
       console.log("Collection Groups created!");
       db.close();
   });
    
});

const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))

app.post("/students", function(req, res) {
    console.log(req.body)
})

app.listen(3000, function () {
    console.log('listening on port 3000')
})


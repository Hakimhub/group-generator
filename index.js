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

console.log("hello")


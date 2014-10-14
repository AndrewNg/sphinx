// Loading required librairies
var mongodb = require('mongodb'),
DB_NAME = "Sphinx",
DB_HOST = "localhost",
DB_PORT = 27017,
COL_NAME = "credentials";

var getCollection = function(callback){
  var db = new mongodb.Db(DB_NAME, new mongodb.Server(DB_HOST, DB_PORT, {}, {safe:false}));
        // Database connection
        db.open(function(error, client){
          if (error) console.error("-- Error with database : " + error);
                // Getting a reference to the credentials collection
                db.collection(COL_NAME, function(error, collection) {
                  callback(collection);
                  db.close();
                })
              })
      }

// Called by server.js
this.insertCredentials = function(credentials, callback) {
  getCollection(function(collection) {
    collection.insert(credentials);
    console.log(credentials + "inserted!");
  })
}
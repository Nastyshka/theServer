var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/serverdb";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    var bro = db.db("mydb");
    bro.createCollection("players", function (err, res) {
        if (err) throw err;
        console.log("Collection players created!");
        db.close();
    });
});

const createPlayer = (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = {name: "John", id: "42"};
        dbo.collection("players").insertOne(myobj, function (err, res) {
            if (err) { response.status(500, err); throw err; }
            console.log("1 document inserted" + res);
            response.status(200).json("1 document inserted" + res);
            db.close();
        });
    });
}

const getPlayers = (request, response) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("players").find({}).toArray(function(err, result) {
            if (err) { response.status(500, err); throw err; }
            console.log(result);
            db.close();
            response.status(200).json(result);
            return result;
        });
    });
}

const getPlayer = (request, response) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log('>>> request id > ' + request.param('id'));
        dbo.collection("players").find({id : request.param('id')}).toArray(function(err, result) {
            if (err) { response.status(500, err); throw err; }
            console.log(result);
            db.close();
            response.status(200).json(result);
            return result;
        });
    });
}
module.exports = {
    getPlayers,
    getPlayer,
    createPlayer
}
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
        dbo.collection("players").insertOne(request.body, function (err, res) {
            if (err) {
                response.status(500, err);
                throw err;
            }
            console.log("1 document inserted" + res);
            response.status(200).json("1 document inserted" + res);
            db.close();
        });
    });
}

const createSessionStart = (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log('>>> ' + Date.now().toString())
        let session = {playerid: request.param('playerid'), sessionstart: Date.now().toString()};

        dbo.collection("sessions").insertOne(session, function (err, res) {
            if (err) {
                response.status(500, err);
                throw err;
            }
            console.log("1 session document inserted" + res.ops[0]._id);
            response.status(200).json(res.ops[0]._id);
            db.close();
        });
    });
}

const updateSessionEnd = (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("mydb");
        console.log('>>>> request >  ' + request.param);

        // let theQuery = {playerid: request.param('playerid')};
        let theQuery = {};
        // let theQuery = {playerid: request.param('playerid'), _id: request.param('sessionid')};
        // let newValues = {$set: {sessionend: new Date(), score: request.param('score')}};
        let newValues = {$set: {sessionend: new Date(), score: "10"}};

       // console.log('>>>> theQuery >  ' + request.param('playerid') + ' > ' + request.param('sessionid'));
        console.log('>>>> newValues >  ' + newValues.score);
        dbo.collection("sessions").find(theQuery, function (err, res) {
            console.log("1 session document found" + res.length);
        })
        dbo.collection("sessions").updateOne(theQuery, newValues, function (err, res) {
            if (err) {
                response.status(500, err);
                throw err;
            }
            console.log("1 session document updated" + res);
            response.status(200).json("1 document updated" + res);
            db.close();
        });
    });
}

const getPlayers = (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("players").find({}).toArray(function (err, result) {
            if (err) {
                response.status(500, err);
                throw err;
            }
            console.log(result);
            db.close();
            response.status(200).json(result);
            return result;
        });
    });
}

const getPlayer = (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        console.log('>>> request id > ' + request.param('id'));
        dbo.collection("players").find({id: request.param('id')}).toArray(function (err, result) {
            if (err) {
                response.status(500, err);
                throw err;
            }
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
    createPlayer,
    createSessionStart,
    updateSessionEnd
}
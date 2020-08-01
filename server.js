const express = require("express")
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const app = express()
const PORT = process.env.PORT || 3000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'heroku_9200wlz6'; // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);


    app.listen(PORT, function () {
        console.log(`Node server is running on port ${PORT}...`);
    });
    app.use(express.static(path.resolve(__dirname, 'client', 'public')));
    app.use(express.urlencoded()); // Parse URL-encoded bodies

    app.get('/', function (req, res) {
        fs.createReadStream('./client/index.html').pipe(res);
    });

});


const express = require("express");
const bodyParser = require("body-parser")
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const app = express()
const PORT = process.env.PORT || 3000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'heroku_9200wlz6'; // Database Name
const dbName2 = 'test'


// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {


    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName2);


    app.listen(PORT, function() {
        console.log(`Node server is running on port ${PORT}...`);
    });
    app.use(bodyParser.json())
    app.use(express.static(path.resolve(__dirname, 'client', 'public')));
    app.use(express.urlencoded()); // Parse URL-encoded bodies

    app.get('/', function(req, res) {
        fs.createReadStream('./client/home-page.html').pipe(res);
    });
    app.get('/products', function(req, res) {
        fs.createReadStream('./client/products.html').pipe(res);
    });
    app.get('/products-items', function(req, res) {
        const collection = db.collection('products')
        collection.find().toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            var array = []
            docs.forEach(element => {
                array.push(element)
            });
            res.send(array)
        });
    })
    app.get('/login', function(req, res) {
        fs.createReadStream('./client/login.html').pipe(res);
    });
    app.get('/register', function(req, res) {
        fs.createReadStream('./client/register.html').pipe(res);
    });


});
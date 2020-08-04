/****************************************************/
// Populate database from json file: countries and capital cities //
/***************************************************/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const fs = require('fs');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'test'; // Database Name



// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {

    assert.equal(null, err);
    console.log("Connected successfully to MongoDB server");

    const db = client.db(dbName);

    fs.readFile('products.json', (err, data) => {

        if (err) throw err;
        let capitals = JSON.parse(data); // read data from json file

        const collection = db.collection('products'); // Get the countries collection
        console.log(capitals);
        collection.insertMany(capitals, function(err, result) { // Insert documents
            assert.equal(err, null);
            console.log(result);
        });

    });

});
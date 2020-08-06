const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const dbName = 'heroku_9200wlz6'; // Database Name
const dbName2 = 'test'
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'; // mongodb Connection URL

let collections = {}
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {


    assert.equal(null, err);
    console.log("Connected successfully to server");
    let db = client.db(dbName2);
    collections.products = db.collection('products')
    collections.users = db.collection('users')
})

module.exports = collections
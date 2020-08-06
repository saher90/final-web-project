const express = require("express");
const bodyParser = require("body-parser")
const fs = require('fs');
const path = require('path');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const assert = require('assert');
const { authorized, parseUser, anonymouse } = require('./middlewares/auth');
const collections = require('./mongodb/connection.js')
    //const MongoClient = require('mongodb').MongoClient;

const app = express()
const PORT = process.env.PORT || 3000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'heroku_9200wlz6'; // Database Name
const dbName2 = 'test'


// Use connect method to connect to the server
//MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {


console.log("Connected successfully to server");



app.listen(PORT, function() {
    console.log(`Node server is running on port ${PORT}...`);
});
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'client', 'public')));
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(parseUser);
app.use(authRouter);

app.get('/', function(req, res) {
    fs.createReadStream('./client/home-page.html').pipe(res);
});
app.get('/products', function(req, res) {
    fs.createReadStream('./client/products.html').pipe(res);
});
app.get('/check-out', authorized, function(req, res) {
    fs.createReadStream('./client/check-out.html').pipe(res);
});

//app.get('/404', (req, res) => res.status(404).sendFile(path.resolve(__dirname, 'client', '404.html')));
app.get('/login', anonymouse, function(req, res) {
    fs.createReadStream('./client/login.html').pipe(res);
});
app.get('/register', anonymouse, function(req, res) {
    fs.createReadStream('./client/register.html').pipe(res);
});
//app.use('/', (req, res) => res.redirect('/404'));


//});
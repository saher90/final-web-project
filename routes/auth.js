const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { authorized, parseUser, anonymouse } = require('../middlewares/auth');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // mongodb Connection URL
const dbName = 'heroku_9200wlz6'; // Database Name
const dbName2 = 'test'
const JWT_SECRET = 'black life matter XD';
const COOKIE_NAME = 'jwt-access-token';

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName2);
    console.log(url)

    router.post('/login', (req, res) => {
        const collection = db.collection('users');
        // make sure request body exist
        if (!req.body) {
            return res.sendStatus(400);
        }

        // make sure user exists and passwords match
        // note: this is a bad practice to store raw passwords
        const { username, password } = req.body;

        collection.find({ 'username': username }).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            let array = []
            let check = true
            if (docs.length == 0) {
                console.log("111")
                check = false;
            }
            docs.forEach(element => {
                array.push(element)
                if (element.password != password) {
                    console.log("222")
                    check = false;
                }
            });
            if (!check) {
                console.log("222222")
                return res.sendStatus(400);
            }
            const user = array.pop()

            // create a jwt token for the user
            const payload = { username: user.username, joined: user.joined };
            const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
            // set cookie for the client with the jwt
            res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });


            res.redirect('/');

        });



    });

    router.post('/register', (req, res) => {
        const collection = db.collection('users');
        // make sure request body exist
        if (!req.body) {
            return res.sendStatus(400);
        }

        const { username, password } = req.body;
        // make sure user does not exist
        collection.find({ 'username': username }).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            let array = []
            docs.forEach(element => {
                array.push(element.username)
            });
            if (array.length > 0) {
                console.log("exist")
                return res.sendStatus(400);
            } else
            // create a new user record in the json db
                console.log("not exist")

            const user = {
                username,
                password,
                joined: new Date().toISOString(),
            };

            collection.insertOne(user);


            // create a jwt token for the user
            const payload = { username: user.username, joined: user.joined };
            const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

            // set cookie for the client with the jwt
            res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });

            res.redirect('/');



        })

    });

    router.get('/logout', (req, res) => {
        // remove the cookie to perform a logout
        res.clearCookie(COOKIE_NAME);
        res.redirect('/');
    });
    router.get('/products-items', function(req, res) {
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
    router.post('/products', authorized, (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const { productId, quantity } = req.body
        const username = req.user.username
        const collection = db.collection('carts');
        const promise = collection.find({ 'username': username }).toArray()
        promise.then(cart => {
            let array = []
            cart.forEach(element => {
                array.push(element)
            })
            console.log(productId)
            console.log(quantity)
            if (array.length == 0) {
                const data = {
                    username: username,
                    products: [{ productId: productId, quantity: quantity }]
                }
                console.log("new to cart")
                console.log(data)
                collection.insertOne(data)
                return res.sendStatus(200)
            }
            var flag = true;
            var oldvalue
            array.forEach(element => {

                element.products.forEach(element1 => {
                    if (element1.productId === productId) {
                        flag = false
                        oldvalue = Number(element1.quantity)
                    }
                })
            });
            if (flag) {
                // push
                collection.updateOne({ username: username }, { $push: { products: { productId, quantity } } })
                return res.sendStatus(200)
            } else {
                //update 
                oldvalue += Number(quantity)
                collection.updateOne({ username: username, "products.productId": productId }, { $set: { "products.$.quantity": oldvalue } })
                return res.sendStatus(200)
            }

        })

    })

});
module.exports = router;
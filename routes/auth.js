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
const ADMINPASSWORD = "telhai"

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

            let array = []
            let check = true
            if (docs.length == 0) {

                check = false;
            }
            docs.forEach(element => {
                array.push(element)
                if (element.password != password) {

                    check = false;
                }
            });
            if (!check) {

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
    router.post('/admin-login', (req, res) => {
        const collection = db.collection('admin-users');
        // make sure request body exist
        if (!req.body) {
            return res.sendStatus(400);
        }

        // make sure user exists and passwords match
        // note: this is a bad practice to store raw passwords
        const { username, password } = req.body;

        collection.find({ 'username': username }).toArray(function(err, docs) {
            assert.equal(err, null);

            let array = []
            let check = true
            if (docs.length == 0) {

                check = false;
            }
            docs.forEach(element => {
                array.push(element)
                if (element.password != password) {

                    check = false;
                }
            });
            if (!check) {

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
            let array = []
            docs.forEach(element => {
                array.push(element.username)
            });
            if (array.length > 0) {

                return res.sendStatus(400);
            }
            // create a new user record in the json db

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
    router.post('/admin-register', (req, res) => {
        const collection = db.collection('admin-users');
        // make sure request body exist
        if (!req.body) {
            return res.sendStatus(400);
        }

        const { username, password, adminPassword } = req.body;

        if (ADMINPASSWORD === adminPassword) {
            // make sure user does not exist
            collection.find({ 'username': username }).toArray(function(err, docs) {
                assert.equal(err, null);
                let array = []
                docs.forEach(element => {
                    array.push(element.username)
                });
                if (array.length > 0) {
                    return res.sendStatus(400);
                }
                // create a new user record in the json db

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
        } else return res.sendStatus(400);

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

            var array = []
            docs.forEach(element => {
                array.push(element)
            })
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
        promise.then(array => {

            if (array.length == 0) {
                const data = {
                    username: username,
                    products: [{ productId: productId, quantity: quantity }],
                }

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
    router.get('/checkuser', (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }
        return res.redirect('/check-out');
    })
    router.get('/load-data', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const username = req.user.username
        const collection = db.collection('carts');
        const promise = collection.find({ username: username }).toArray()
        promise.then(cart => {
            let retArray = []
            if (cart.length > 0) {
                let productsName = []
                cart.forEach(docs => {
                    docs.products.forEach(product => {
                        productsName.push(product.productId)
                    })

                })

                const collection2 = db.collection('products');
                const promise2 = collection2.find({ name: { $in: productsName } }).toArray()
                promise2.then(products => {
                    cart.forEach(doc => {
                        doc.products.forEach(productUser => {
                            products.forEach(product => {
                                if (productUser.productId === product.name) {
                                    const data = {
                                        name: product.name,
                                        price: product.price,
                                        imgname: product.imgname,
                                        description: product.description,
                                        quantity: productUser.quantity
                                    }

                                    retArray.push(data)

                                }
                            })

                        })
                    })
                    return res.send(retArray)
                })

            } else return res.send(retArray)

        })

    })
    router.get('/is-admin', (req, res) => {

        if (!req.body) {
            return res.send({ admin: false });
        }

        if (!req.user) {
            return res.send({ admin: false })
        }
        const username = req.user.username
        const collection = db.collection('admin-users');
        const array = collection.findOne({ username: username })
        array.then(doc => {
            if (doc) return res.send({ admin: true })
            else return res.send({ admin: false })
        })
    })
    router.post('/update-quantity', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const username = req.user.username
        const { productId, quantity } = req.body
        var oldval
        const collection = db.collection('carts');
        const promise = collection.find({ username: username }).toArray()
        promise.then(cart => {
            cart.forEach(doc => {
                doc.products.forEach(productUser => {
                    if (productUser.productId === productId) {
                        oldval = productUser.quantity
                    }
                })
            })
            const val = Number(quantity)
            collection.updateOne({ username: username, "products.productId": productId }, { $set: { "products.$.quantity": val } })
            return res.status(200).send({ quantity: quantity, oldquantity: oldval });
        })

    })
    router.post('/remove-iteam', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const username = req.user.username
        const { productId } = req.body
        const collection = db.collection('carts');
        collection.updateOne({ username: username }, { $pull: { products: { productId: productId } } });
        return res.status(200).send();

    })
    router.post('/order', (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const { firstname, lastname, tel, email, address, country, city, totalPrice, deliveryMethod } = req.body
        const collection = db.collection('carts');
        const collection2 = db.collection('orders');
        const username = req.user.username
        var orders = []
        const array = collection.findOne({ username: username })

        array.then(doc => {
            doc.products.forEach(product => {
                orders.push(product)
            })

            const data = {
                username,
                firstname,
                lastname,
                tel,
                email,
                address,
                country,
                city,
                totalPrice,
                deliveryMethod,
                date: new Date().toISOString(),
                orders
            }
            collection2.insertOne(data)
            collection.deleteOne({ username: username })
            return res.status(200).send();
        })
    })
    router.get('/load-orders', (req, res) => {
        const collection = db.collection('orders');
        collection.find().toArray(function(err, docs) {
            assert.equal(err, null);
            var array = []
            docs.forEach(element => {
                array.push(element)
            })
            res.status(200).send(array)
        });

    })


});
module.exports = router;
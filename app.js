const express = require('express'),
    app = express(),
    mongoClient = require('mongodb').MongoClient,
    docs = require('./testdocs'),
    dbUrl = require('./config').dbUrl

var port = process.env.PORT || 3000;

var orders;
var db;

//connecting to database
mongoClient.connect(dbUrl)
    .then(database => {
        db = database;
        //get the orders collection
        orders = database.collection('orders');

        //empty the collection
        return orders.deleteMany({});
    }).then(result => {
        //insert documents for testing
        return orders.insertMany(docs);
    }).then(result => {
        //register routes
        app.use('/', require('./routers/orders')(db));
        //start server
        return app.listen(port);
    }).then(server => {
        console.log(`Server started and listening to port ${port}`);
    });
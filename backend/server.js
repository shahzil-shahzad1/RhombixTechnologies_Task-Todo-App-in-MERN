const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require("body-parser")
const cors = require("cors")
const app = express()
dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'ReactTodos';
const port = 3000
app.use(bodyparser.json())
app.use(cors())
// Connecting with Local mongodb 
client.connect();
// For getting data from db
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('todoos');
    // to fetch items 
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})  
// For Saving data in db
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('todoos');
    const findResult = await collection.insertOne(password);
    // res.json(findResult)
    res.send({surcces: true, result: findResult})
})  

// Delete a password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('todoos');
    const findResult = await collection.deleteOne(password);
    // res.json(findResult)
    res.send({surcces: true, result: findResult})
})  

app.put('/', async (req, res) => {
    const para = req.body;
    const filter  = {id: para.id};
    const db = client.db(dbName);
    const collection = db.collection('todoos');
    const  update = {$set: { todo: para.todo }}
    const options = {
        returnDocument: 'after',  // Return the updated document ('before' for the old document)
        upsert: false,            // Do not insert if the document doesn't exist
    };
    const findResult =  await collection.findOneAndUpdate(filter, update, options);
    // res.json(findResult)
    res.send({surcces: true, result: findResult})
})  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("error!! " + err)
    } else { 
      //  c onsole.log("MongoDB Connection Successful")
    }
})
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });
  
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
  });
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);

planetModel.insertMany([
    { id: 1, name: "Mercury", description: "Smallest planet", image: "", velocity: "47.87 km/s", distance: "57.91 million km" },
    { id: 2, name: "Venus", description: "Hottest planet", image: "", velocity: "35.02 km/s", distance: "108.2 million km" },
    { id: 3, name: "Earth", description: "Our home planet", image: "", velocity: "29.78 km/s", distance: "149.6 million km" },
    { id: 4, name: "Mars", description: "The Red Planet", image: "", velocity: "24.07 km/s", distance: "227.9 million km" },
    { id: 5, name: "Jupiter", description: "Largest planet", image: "", velocity: "13.07 km/s", distance: "778.5 million km" },
    { id: 6, name: "Saturn", description: "Has beautiful rings", image: "", velocity: "9.69 km/s", distance: "1.43 billion km" },
    { id: 7, name: "Uranus", description: "Sideways planet", image: "", velocity: "6.81 km/s", distance: "2.87 billion km" },
    { id: 8, name: "Neptune", description: "Farthest planet", image: "", velocity: "5.43 km/s", distance: "4.50 billion km" }
])

app.post('/planet',   function(req, res) {
   // console.log("Received Planet ID " + req.body.id)
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            alert("Ooops, We only have 9 planets and a sun. Select a number from 0 - 9")
            res.send("Error in Planet Data")
        } else {
            res.send(planetData);
        }
    })
})

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})


module.exports = app;
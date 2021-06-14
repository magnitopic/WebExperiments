require('dotenv').config()
const express = require('express');
const axios = require("axios").default;
const mongoose = require('mongoose');
const path = require('path');
const Dice = require('./models/dice');
const ESP = require('./models/esp');
const geoip = require('geoip-lite');
const { json } = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
//Midleware for parsing JSON
app.use(express.json());
//Defining the view engine 
app.set('view engine', 'ejs');
//and the folder with the ejs files
app.set('views', 'web');

app.use(express.static(path.join(__dirname, 'web')));

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err));

//Code for the connection of the esp8266 board 

app.post('/esp', (req, res) => {
    console.log(req.body);
    const esp = new ESP(req.body);

    esp.save()
        .then((result) => {
            res.send("Data saved");
        })
        .catch((err) => {
            res.send(req.body)
            console.log(err);
        })
});

app.get('/esp', (req, res) => {
    ESP.find()
        .then((result) => {
            res.render('esp', { esp: result })
        })
        .catch((err) => {
            console.log(err)
        })
});

//Code for the connections for the /dice page


app.get('/dice', (req, res) => {
    Dice.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('dice', { dice: result })
        })
        .catch((err) => {
            console.log(err)
        })
});

//We use toLocaleString() to turn the date to a shorter format
app.post('/dice', (req, res) => {
    const range = req.body.range
    var ip = JSON.stringify(req.socket.remoteAddress);
    var geo = geoip.lookup(ip);
    console.log(typeof ip);
    console.log(typeof geo);
    console.log(geo);
    console.log(ip);
    if (range >= 1) {
        const result = Math.floor(Math.random() * range + 1);
        const dice = new Dice({
            date: new Date().toLocaleString(),
            range: range,
            result: result,
            country: geo.country
        });

        dice.save()
            .then(result => {
                console.log(ip)
                res.redirect('/dice');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.redirect('/dice');
    }
});

//Route to delete all dice entries
app.delete('/dice', (req, res) => {
    Dice.deleteMany({})
        .then(result => {
            res.json({ redirect: '/dice' });
        })
        .catch(err => console.log(err));
});

//Get a raw json vew of all the dice stored
app.get('/all-dice', (req, res) => {
    Dice.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err)
        })
});

app.get('/', (req, res) => {
    res.render('index');
});

//Main page for map 
/*app.get('/map', (req, res) => {
    console.log(`Loading map`)
    res.render('map');
});*/

//Status 404 for all other routes
app.use((req, res) => res.status(404).render('404'));

app.listen(port, host, () =>
    console.log(`\nServer runing on port ${port} at http://localhost:${port}`)
);
require('dotenv').config()
const https = require('https');
const http = require('http');
const userIP = require('user-ip');
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
const host = process.env.HOST || '::';

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

//
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
	var ip = userIP(req);
	console.log(ip);
    var geo = geoip.lookup(ip);
    console.log(geo);

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
app.get('/map', (req, res) => {
	console.log(`Loading map`)
	res.render('map');
});

//Experiment on working with Spanish goverment APIs, on hold for now
app.get('/carburantes',(req,res)=>{
	https.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres', (resp) => {
	let data = '';

	// A chunk of data has been received.
	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		console.log(data);
		res.render("gasolinera", {
			result: data
		})
	});
	}).on("error", (err) => {
	console.log("Error: " + err.message);
	});
});	

//Page for NASA APOD API
app.get('/apod',(req,res)=>{
	url=('https://api.nasa.gov/planetary/apod?api_key='+process.env.NASA_KEY)
	https.get(url, (resp) => {
	let data = '';

	// A chunk of data has been received.
	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		console.log(data);/*
		const html = await ejs.renderFile(view, data, {async: true});
		res.send(html); */
		res.render("nasa", { response: data })
	});
	}).on("error", (err) => {
	console.log("Error: " + err.message);
	});
});	


// Page for dead pixel checker
app.get('/pixel',(req,res)=>{
	res.render('pixel');
});

app.get('/pixel-colours',(req,res)=>{
	res.render('pixel-colours');
});

//Status 404 for all other routes
app.use((req, res) => res.status(404).render('404'));

app.listen(port, host, () =>
	console.log(`\nServer runing on port ${port} at http://localhost:${port}`)
);
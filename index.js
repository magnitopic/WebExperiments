const express= require('express');
const mongoose= require('mongoose');
const path=require('path');
const Dice =require('./models/dice');
const ESP =require('./models/esp');
const geoip = require('geoip-lite');
const { json } = require('express');

const app=express();
const dbURL='mongodb://localhost/NodeServerDB';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'web');

app.use(express.static(path.join(__dirname, 'web')));

const port=process.env.PORT || 8080;

mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(result => app.listen(port, () => console.log(`\nServer runing on port ${port}`)), console.log('Connection to DB successful'))
    .catch(err => console.log(err));

//Code for the connection of the esp8266 board 

app.post('/esp', (req, res)=>{
    console.log(req.body)
	const esp = new ESP(req.body);

    esp.save()
    .then((result)=>{
        res.send("hi");
    })
    .catch((err)=>{
        console.log(err);
    })
});
	
//Code for the connections for the /dice page
	
	
app.get('/dice', (req,res)=>{
    Dice.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('dice', { dice: result })
        })
        .catch((err)=>{
            console.log(err)
        })
});

//We use toLocaleString() to turn the date to a shorter format
app.post('/dice', (req, res) =>{
    const range= req.body.range
    var ip = req.connection.remoteAddress;
    var geo = geoip.lookup(ip);
    console.log(typeof ip);
    console.log(typeof geo);
    console.log(geo);
    console.log(ip);
    if (range>=1){
    const result=Math.floor(Math.random()*range+1);
    const dice = new Dice({
        date:  new Date().toLocaleString(),
        range: range,
        result: result,
        country: geo.country
    });

    dice.save()
        .then(result => {
            console.log(ip)
            res.redirect('/dice');
        })
        .catch(err =>{
            console.log(err);
        });
    }else{
        res.redirect('/dice');
    }
});

app.delete('/dice',(req,res)=>{
    Dice.deleteMany({})
    .then(result=>{
        res.json({ redirect: '/dice'});
    })
    .catch(err=>console.log(err));
});

app.get('/all-dice', (req, res) =>{
    Dice.find()
        .then(result => {
            res.send(result);
        })
        .catch(err=>{
            console.log(err)
        })
})

app.get('/', (req, res) => res.sendFile('./web/index.html', {root: __dirname}));

app.use((req,res) => res.status(404).render('404'));
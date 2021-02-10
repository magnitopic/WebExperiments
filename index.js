const express= require('express');
const mongoose= require('mongoose');
const path=require('path');
const Dice =require('./models/dice');
const geoip = require('geoip-lite');

const app=express();
const dbURL='mongodb://localhost/NodeServerDB';
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'web');

app.use(express.static(path.join(__dirname, 'web')));

mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(result => app.listen(8080, () => console.log('\nServer runing on port 8080\n\nPress ctrl+c to stop')), console.log('Connection to DB successful'))
    .catch(err => console.log(err));

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
    const range= req.body.range;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var ip2='82.213.244.240'; //This var should be deleted when server deployed
    var geo = geoip.lookup(ip2);    //ip2 should just be ip when server deployed
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
            console.log(geo)
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

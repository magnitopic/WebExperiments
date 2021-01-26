const express= require('express');
const mongoose= require('mongoose');
const path=require('path');
const Dice =require('./models/dice');

const app=express();
const dbURL='mongodb://localhost/NodeServerDB';
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(result => app.listen(8080, () => console.log('\nServer runing on port 8080\n\nPress ctrl+c to stop')), console.log('Connection to DB successful'))
    .catch(err => console.log(err));

app.get('/dice', (req,res)=>{
    res.sendFile(path.join(__dirname+'/web/dice.html'));
});

app.post('/dice', (req, res) =>{
    console.log(req.body)
    //const dice = new Dice(req.body)
});

app.get('/add-dice', (req, res) => {
    const dice = new Dice({
        date: Date.now(),
        range: 6,
        result: 3
    })

    dice.save()
        .then(result => {
            res.send(result)
        })
        .catch(err =>{
            console.log(err);
        });
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

app.use((req,res) => res.sendFile('./web/404.html', {root: __dirname}))

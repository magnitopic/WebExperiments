const express= require('express');
const mongoose= require('mongoose');
const path=require('path');
const Dice =require('./models/dice');

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
    const result=Math.floor(Math.random()*range+1);
    const dice = new Dice({
        date:  new Date().toLocaleString(),
        range: range,
        result: result
    });

    dice.save()
        .then(result => {
            res.redirect('/dice');
        })
        .catch(err =>{
            console.log(err);
        });
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

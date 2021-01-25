const express= require('express');
const mongoose= require('mongoose');
const Dice =require('./models/dice');

const app=express();
const dbURL='mongodb://localhost/NodeServerDB';

mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then((result) => app.listen(8080, () => console.log('\nServer runing on port 8080\n\nPress ctrl+c to stop')), console.log('Connection to DB successful'))
    .catch((err) => console.log(err));

app.get('/add-dado', (req, res) => {
    const dice = new Dice({
        date: req.date,
        range: 6,
        result: 3
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.get('/', (req, res) => res.send('Hola Mundo'));

const users = require('./users-router')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const app = express();
const port = 7645;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);

app.get('/tasks', async (req, res) => {
    res.send('Tasks');
})

app.use((req, res)=>{
    res.send(404);
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at ${process.env.PORT}`)
})


process.on('unhandledRejection', function (reason, p) {
    console.log(reason, p);
});

const users = require('./users-router')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// process.on('unhandledRejection', function (reason, p) {
//     console.log(reason, p);
// });

"use strict";
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    let message = 'Hello World!!2!';
    res.send(message);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

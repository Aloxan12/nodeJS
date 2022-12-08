const express = require('express')
const app = express()
const port = 3000

app.get('/', (req:Request, res:any) => {
    let message = 'Hello World!!!'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
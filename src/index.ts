import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3005

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
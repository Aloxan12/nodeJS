import express, {Request, Response} from 'express'
import { productRouter } from './routers/product-router'
import { addressesRouter } from './routers/addresses-router'
import { runDb } from './respositories/db'
import admin from 'firebase-admin'
const credential = require('../nodejs-a451c-firebase-adminsdk-cw6uj-39f389fd44.json')

const app = express()
const port = process.env.PORT || 5000

admin.initializeApp({
    credential: admin.credential.cert(credential)
})

const parserMiddleweare = express.json()
app.use(parserMiddleweare)

app.post('/user', async (req: Request, res: Response)=>{
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    console.log('user', user)
    const userResponse = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
    })
    res.json(userResponse)
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai   ')
})

app.use(express.urlencoded({extended: true}))

app.use('products', productRouter)
app.use('addresses', addressesRouter)

const startApp = async ()=>{
    try{
        await runDb()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }catch {
        console.log('error')
    }
}

startApp()
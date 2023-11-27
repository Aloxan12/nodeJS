import express, {Request, Response} from 'express'
import { productRouter } from './routers/product-router'
import { userRouter } from './routers/user-router'
import cors from 'cors'
import { runDb } from './respositories/dbMongo'
import { authRouter } from './routers/auth-router'
import expressFileupload  from 'express-fileupload'
import path from 'path'
import { postRouter } from './routers/post-router'

const app = express()
const port = process.env.PORT || 5000

app.use(expressFileupload())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, '..', 'src', "tmp")));
app.use(cors())

app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai')
})
app.use('', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

const KEYFILEPATH = path.join(__dirname, "credentials.json");

const startApp = async ()=>{
    try{
        console.log('res', {
            type: process.env.type || '',
            quota_project_id: process.env.project_id || '',
            private_key: process.env.private_key?.replace(/\\n/g, '\n') || '',
            client_email: process.env.client_email || '',
            client_id: process.env.client_id || '',
            token_url: process.env.token_uri || '',
        })
        await runDb()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }catch {
        console.log('error')
    }
}

startApp()
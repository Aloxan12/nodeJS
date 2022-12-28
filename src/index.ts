import express, {Request, Response} from 'express'
import { productRouter } from './routers/product-router'
import { userRouter } from './routers/user-router'
import cors from 'cors'
import { runDb } from './respositories/dbMongo'
import { authRouter } from './routers/auth-router'
import expressFileupload, {UploadedFile} from 'express-fileupload'
import path from 'path'
import { postRouter } from './routers/post-router'

const app = express()
const port = process.env.PORT || 5000

app.use(expressFileupload())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'src', "uploads")));
app.use(cors())

app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai')
})
app.use('', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

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
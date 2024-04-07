import express, {Request, Response} from 'express'
import { productRouter } from './routers/product-router'
import { userRouter } from './routers/user-router'
import cors from 'cors'
import { runDb } from './respositories/dbMongo'
import { authRouter } from './routers/auth-router'
import expressFileupload  from 'express-fileupload'
import path from 'path'
import cookieParser from 'cookie-parser'
import { postRouter } from './routers/post-router'
import { setupWebSocketServer} from "./websockets/websocket-server";
import {chatRouter} from "./routers/chat-router";
import {messageRouter} from "./routers/message-router";

const app = express()
export const port = process.env.PORT || 5000

app.use(expressFileupload())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, '..', 'src', "tmp")));
app.use(cors({origin: ['http://localhost:3000', 'https://aloxan12.github.io'], credentials: true}))

app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai')
})
app.use('', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/chats', chatRouter)
app.use('/messages', messageRouter)

const startApp = async ()=>{
    try{
        await runDb()
        const server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
        setupWebSocketServer(server)
    }catch (error) {
        console.error('Error starting the app:', error);
    }
}

startApp().catch((error)=> console.log('error', error))
export default app;
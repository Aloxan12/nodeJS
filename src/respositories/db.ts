import {MongoClient} from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

// Connection URL
const url = process.env.MONGO_URL
console.log('url :', url)
if (!mongoUri) {
    throw new Error('❗ Url doesn\'t found')
}
// const client = new MongoClient(url);

export const client = new MongoClient(mongoUri)
export async function runDb(){
    try{
        await client.connect()
        await client.db('products')
        console.log('Connected successfully to mongo server')
    }catch{
        await client.close()
    }
}
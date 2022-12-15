import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

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
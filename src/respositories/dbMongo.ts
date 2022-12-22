import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

export interface ProductType{
    id: number
    title: string
}

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const client = new MongoClient(url);
const db = client.db('shop')

export const productsCollection = db.collection<ProductType>('products')


export const runDb = async () => {
    try {
        await client.connect();
        console.log('✅ Connected successfully to server');
    } catch (e) {
        console.log('❗ Don\'t connected successfully to server');
        await client.close()
    }
};
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

export type ProductType = {
    title: string
    _id?: ObjectId
}

const url = process.env.MONGO_URL || "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

export const client = new MongoClient(url);


export const runDb = async () => {
    try {
        await client.connect();
        console.log('✅ Connected successfully to server');
    } catch (e) {
        console.log('❗ Don\'t connected successfully to server');
        await client.close()
    }
};
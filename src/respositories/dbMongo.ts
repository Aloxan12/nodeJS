import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

export type ProductType = {
    title: string
    _id?: ObjectId
}

const url = process.env.MONGO_URL

const client = new MongoClient('mongodb+srv://aloxan12:aloxan12_12@cluster0.gb4b92i.mongodb.net/?retryWrites=true&w=majority');

// if (!url) {
//     throw new Error('❗ Url doesn\'t found')
// }
// const client = new MongoClient(url);
//
// export const productCollection = client.db().collection<ProductType>('products');
//
export const runDb = async () => {
    try {
        await client.connect(err => {
            const collection = client.db("test").collection("devices");
            client.close();
        });

        const products = await client.db('nodeJS').collection('products');
        await products.insertOne({title:'milk'})
        console.log('✅ Connected successfully to server');
    } catch (e) {
        console.log('❗ Don\'t connected successfully to server');
        await client.close()
    }
};
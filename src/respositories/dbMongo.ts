import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

export enum RoleType {
    'ADMIN' = 'ADMIN',
    'USER' = 'USER',
}

export interface ProductType{
    id: number
    title: string
}

export interface UserType{
    email: string;
    password: string;
    _id: string;
    isActivated: boolean;
    role: RoleType;
    avatar: string;
    status: string;
}


const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
console.log('url', url)
const client = new MongoClient(url, { serverApi: ServerApiVersion.v1 });
const db = client.db('new_JWT')

export const productsCollection = db.collection<ProductType>('products')
export const userCollection = db.collection<UserType>('users')


export const runDb = async () => {
    try {
        await client.connect();
        console.log('✅ Connected successfully to server');
    } catch (e) {
        console.log('❗ Don\'t connected successfully to server');
        await client.close()
    }
};
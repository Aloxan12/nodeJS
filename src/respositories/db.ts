import * as dotenv from 'dotenv'
import * as firebase from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const credential = require('../../nodejs-a451c-firebase-adminsdk-cw6uj-39f389fd44.json')

dotenv.config()


export async function runDb(){
    try{
        const app = firebase.initializeApp(credential)
        const db = getFirestore(app)
        console.log('Connected successfully to mongo server')
    }catch{
    }
}
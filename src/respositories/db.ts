const firebase = require('./../../node_modules/firebase');

const db = firebase.initializeApp({
    apiKey: "AIzaSyD581GhiBddQSn1yg0HhWjnl42ImC7L2MI",
    authDomain: "nodejs-a451c.firebaseapp.com",
    databaseURL: "https://nodejs-a451c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nodejs-a451c",
    storageBucket: "nodejs-a451c.appspot.com",
    messagingSenderId: "292215175437",
    appId: "1:292215175437:web:ce5e4f636d9c74e3555844",
    measurementId: "G-QC16425F3N"
});
export const firestore = db.firestore();

export async function getProducts(){
    try{
        // const ddd  = await firestore.collection('products').doc().get()
        // console.log('ddd', ddd )
    }catch(e){
        console.log('e')
    }
}
import stream from "stream"
import express from "express"
// import multer from "multer"
import path from "path"
import {google} from 'googleapis'


const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
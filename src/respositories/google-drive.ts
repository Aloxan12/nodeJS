import {PassThrough, Readable,} from "stream"
import express from "express"
import multer from "multer"
import path from "path"
import {google} from 'googleapis'


const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

export const uploadFile = async (fileObject: any): Promise<string | null> => {
    const bufferStream = new PassThrough();
    bufferStream.end(fileObject.data);
    const {data} = await google.drive({version: "v3", auth}).files.create({
        media: {
            mimeType: fileObject.mimetype,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.name,
            parents: ["1Cw4ql7UrpQnO8wuDCyC0DrkIQ_ZjsiQV"],
        },
        fields: "id,name",
    });
    return !!data.id ? data.id : null
};
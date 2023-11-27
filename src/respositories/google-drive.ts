import {PassThrough} from "stream"
import path from "path"
import {google} from 'googleapis'


const KEYFILEPATH = path.join(__dirname,'..', '..', "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];


const auth = new google.auth.GoogleAuth({
    // keyFile: KEYFILEPATH,
    credentials:{
        type: process.env.type || '',
        quota_project_id: process.env.project_id || '',
        private_key: process.env.private_key || '',
        client_email: process.env.client_email || '',
        client_id: process.env.client_id || '',
        token_url: process.env.token_uri || '',
    },
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
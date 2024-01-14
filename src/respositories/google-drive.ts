import {PassThrough} from "stream"
import {google} from 'googleapis'

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const credentials = {
    "type": process.env.type || '',
    "project_id": process.env.project_id || '',
    "private_key_id": process.env.private_key_id || '',
    "private_key": process.env.private_key?.replace(/\\n/g, '\n') || '',
    "client_email": process.env.client_email || '',
    "client_id": process.env.client_id || '',
    "auth_uri": process.env.auth_uri || '',
    "token_uri": process.env.token_uri || '',
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url || '',
    "client_x509_cert_url": process.env.client_x509_cert_url || ''
};

const auth = new google.auth.GoogleAuth({
    projectId: process.env.project_id,
    credentials,
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
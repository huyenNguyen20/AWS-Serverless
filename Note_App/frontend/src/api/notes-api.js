import axios from "axios";
import { getCredentials } from "./auth-api";
import { RequestSigner } from 'aws4';

const API_ROOT = 'https://www.englishtest24.tk';
const STAGE = '/v1';

function setOptions (path = '/', method = '', body = '') {
    const host = new URL(API_ROOT);

    let args = {
        service: 'execute-api',
        region: 'ap-southeast-1',
        hostname: host.hostname,
        path: path,
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if(method == 'GET' || method == 'DELETE') {
        delete args.body;
    }

    const options = {};
    try {
        let savedCredsJson = getCredentials();

        if(savedCredsJson) {
            let savedCreds = JSON.parse(savedCredsJson);
            let creds = {
                accessKeyId: savedCreds.Credentials.AccessKeyId,
                secretAccessKey: savedCreds.Credentials.SecretKey,
                sessionToken: savedCreds.Credentials.SessionToken
            };

            let signer = new RequestSigner(args, creds);
            let signed = signer.sign();

            options.headers = signed.headers;
            delete options.headers.Host;

            options.headers.app_user_id = savedCreds.IdentityId;
            options.headers.app_user_name = savedCreds.user_name;

            return options;
        }
        else throw new Error("Unauthorized")

    } catch (error) {
        // do nothing
    }
    
}
export async function createNote(item) {
    let path = STAGE + '/note';
    let endpoint = API_ROOT + path;
    
    let itemData;
    itemData = {
        content: item.content,
        category: item.category
    };

    if(item.title != "") {
        itemData.title = item.title;
    }

    let reqBody = {
        Item: itemData
    };
    const options = setOptions(path, 'POST', JSON.stringify(reqBody));
    return await axios.post(endpoint, reqBody, options);
}

export async function updateNote(item) {
    let path = STAGE + '/note';
    let endpoint = API_ROOT + path;
    
    let itemData;
    itemData = {
        content: item.content,
        category: item.category,
        timestamp: parseInt(item.timestamp),
        note_id: item.note_id
    };

    if (item.title != "") {
        itemData.title = item.title;
    }

    let reqBody = {
        Item: itemData
    };
    const options = setOptions(path, 'PATCH', JSON.stringify(reqBody));
    return this.httpClient.patch(endpoint, reqBody, options);
}

export async function getNotes() {
    let path = STAGE + '/notes?limit=8';
    let endpoint = API_ROOT + path;
    const options = setOptions(path, 'GET', '');
    return await axios.get(endpoint, options);
}

export async function deleteNotes(timestamp) {
    let path = STAGE + '/note/t/' + timestamp;
    let endpoint = API_ROOT + path;
    const options = setOptions(path, 'DELETE', '');
    return this.httpClient.delete(endpoint, options);
}
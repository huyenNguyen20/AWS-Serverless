import axios from "axios";

const API_ROOT = 'https://www.englishtest24.tk/v1';
const STAGE = '';

window.gapi.load('auth2', () => {
    window.gapi.auth2.init();
})

export async function setCredentials(id_token) {
    try{
            console.log('id_token ---', id_token);
        let endpoint = API_ROOT + STAGE + '/auth';
        const resp = await axios.get(endpoint, {
            headers: {
              Authorization: id_token,
            },
        })

        localStorage.setItem('id_token', id_token);
        localStorage.setItem('aws', JSON.stringify(resp.data));
        return resp.data;
    } catch(e){
        localStorage.removeItem('id_token');
        localStorage.removeItem('aws'); 
        throw e;
    }
}

export function getCredentials() {
        return localStorage.getItem('aws');
}

export function getIdToken() {
        return localStorage.getItem('id_token');
}

/**
 * In addition to AWS credentials expiring after a given amount of time, 
 * the login token from the identity provider will also expire. 
 * Once this token expires, it will not be usable to refresh AWS credentials, 
 * and another token will be needed. The SDK does not manage refreshing of the token value
 */
 export async function isLoggedIn() {
        let id_token = this.getIdToken();

        if (id_token) {
            let endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
            try {
                const resp = await axios.get(endpoint);
                return resp.data;
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error ("No token found");
        }
}    

export async function login() {
    let googleAuth = await window.gapi.auth2.getAuthInstance();
    let googleUser = await googleAuth.signIn({ scope: 'profile email' });
    let id_token = googleUser.getAuthResponse().id_token;
    return await setCredentials(id_token);
}

export async function logout() {
    var googleAuth = window.gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
    
    localStorage.removeItem('id_token');
    localStorage.removeItem('aws');
}

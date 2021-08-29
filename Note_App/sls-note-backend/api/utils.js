const getIDToken = (headers) => {
    return headers.Authorization;
}
const getUserName = (headers) => {
    return headers.app_user_name;
}
const getUserId = (headers) => {
    return headers.app_user_id;
}
const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
}

module.exports = {
    getResponseHeaders,
    getUserName,
    getUserId,
    getIDToken
}
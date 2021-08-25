const moment = require('moment');

const greeting = {
    "en": "Hello",
    "fr": "Bonjour",
    "hi": "Namaste",
    "de": "Hallo",
    "vi": "Xin Chao",
    "jp": "Konichiwa"
}

exports.handler = async (event, context) => {
    const name = event.pathParameters.name;
    const {lang, ...info} = event.queryStringParameters;
    let message = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;
    let response = {
        message,
        info,
        timestamp: moment().unix()
    };
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}
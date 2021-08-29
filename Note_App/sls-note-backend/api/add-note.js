/**
 * Route: POST /note
 */
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const utils = require('./utils.js');
const {uuid} = require('uuidv4');
const moment = require('moment');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let item = JSON.parse(event.body).item;
        item.user_id = utils.getUserId(event.headers);
        item.user_name = utils.getUserName(event.headers);
        item.note_id = item.user_id + ':' + uuid();
        item.timestamp = moment().unix();
        item.expires = moment().add(90, 'days').unix();

        await dynamoDB.put({
            TableName: tableName,
            Item: item
        }). promise();

        return {
            statusCode: 200,
            headers: utils.getResponseHeaders(),
            body: JSON.stringify(item)
        }
    } catch (err) {
        console.error(err)
        return {
            statusCode: err.statusCode || 500,
            headers: utils.getResponseHeaders(),
            body: JSON.stringify({
                name: err.name || "Exception",
                message: err.message || "Unknown Cause"
            })
        }
    }
}
/**
 * Route: DELETE /note/t/{timestamp}
 */

const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const utils = require('./utils.js');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let timestamp = parseInt(event.pathParameters.timestamp);
        let params = {
            TableName: tableName,
            Key: {
                user_id: utils.getUserId(event.headers),
                timestamp
            }
        }
        await dynamoDB.delete(params).promise();
        return {
            statusCode: 200,
            headers: utils.getResponseHeaders(),
            body: JSON.stringify({
                message: 'Note Deleted Successfully'
            })
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: utils.getResponseHeaders(),
            body: JSON.stringify({
                name: err.name || "Exception",
                message: err.message || "Unknow Cause"
            })
        }
    }
}
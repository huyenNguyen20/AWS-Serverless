/**
 * Route: /notes?limit=number&&start=timestamp
 */

const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const utils = require('./utils.js');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    try {
        let query = event.queryStringParameters;
        let limit = query && query.limit ? parseInt(query.limit) : 5;
        let user_id = utils.getUserId(event.headers);

        let params = {
            TableName: tableName,
            KeyConditionExpression: "user_id = :uid",
            ExpressionAttributeValues: {
                ':uid' : user_id
            },
            Limit: limit,
            ScanIndexForward: false
        }

        let startTimestamp = query && query.start ? parseInt(query.start) : 0;

        if(startTimestamp > 0){
            params.ExclusiveStartKey = {
                user_id,
                timestamp: startTimestamp
            }
        }

        let data = await dynamoDB.query(params).promise();

        return {
            statusCode: 200,
            headers: utils.getResponseHeaders(),
            body: JSON.stringify(data)
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
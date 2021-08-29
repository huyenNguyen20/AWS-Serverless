/**
 * Route: GET /note/n/{note_id}
 */
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const utils = require('./utils.js');
const _ = require('underscore');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    
    try {
        let note_id = decodeURIComponent(event.pathParameters.note_id);

        let params = {
            TableName: tableName,
            IndexName: "note_id-index",
            KeyConditionExpression: "note_id = :note_id",
            ExpressionAttributeValues: {
                ":note_id": note_id
            },
            Limit: 1
        };

        let data = await dynamoDB.query(params).promise();
        
        if(!_.isEmpty(data.Items)){
            return {
                statusCode: 200,
                headers: utils.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            }
        } else {
            return {
                statusCode: 404,
                headers: utils.getResponseHeaders(),
                body: JSON.stringify({
                    message: "Note Not Found"
                })
            }
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
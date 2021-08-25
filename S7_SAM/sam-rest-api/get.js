const AWS = require('aws-sdk');
const _ = require('underscore');

AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler =  async (event) => {
    let userid = event.pathParameters.userid;
   
    let data = await docClient.get({
                    TableName: tableName,
                    Key: {
                        userid
                    }}).promise();
    console.log(data);
    if(!_.isEmpty(data)) {
        return {
        statusCode: 200,
        body: JSON.stringify(data.Item)
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'User Not Found'
            })
        }
    }
}
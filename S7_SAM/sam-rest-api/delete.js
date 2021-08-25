const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const clientDoc = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler =  async (event) => {
    const userid = event.pathParameters.userid;
    const data = await clientDoc.delete({
        TableName: tableName,
        Key: {
            userid
        }
    }).promise();
    console.log(data);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'User deleted successfully'
        })
    }
}
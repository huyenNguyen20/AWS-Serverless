const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler =  async (event) => {
    let userid = event.pathParameters.userid;
    let {firstName, lastName, email} = JSON.parse(event.body);
    let item = {
        userid,
        timestamp: new Date().getTime(),
        firstName,
        lastName,
        email
    }

    const data = await docClient.put({
                    TableName: tableName,
                    Item: item
                }).promise();
    console.log(data);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User created successfully"
        })
    }
}
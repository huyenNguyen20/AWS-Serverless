const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();
/*************CONDITIONAL CREATE************* */
docClient.put({
    TableName : 'td_notes_sdk',
    Item: {
       user_id: "aa",
       timestamp: 1,
       title: "New Note",
       content: "New Note Content"
    },
    ConditionExpression: "#t <> :t",
    ExpressionAttributeNames: {
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':t': 1
    }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 1))
    }
})
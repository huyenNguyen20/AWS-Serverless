const AWS = require('aws-sdk');
const region = 'ap-southeast-1';
AWS.config.update({region});

const dynamodb = new AWS.DynamoDB();

/*****************LIST TABLES******************** */
// dynamodb.listTables({}, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


/*****************DESCRIBE TABLE******************** */
// dynamodb.describeTable({
//       TableName:'td_notes_sdk'
// }, function(err, data) {
//     if (err) console.log(err); // an error occurred
//     else     console.log(JSON.stringify(data, null, 2));           // successful response
// });


/*****************CREATE TABLE******************** */
dynamodb.createTable({
      TableName:'td_notes_sdk',
      AttributeDefinitions: [
        {
            AttributeName: "user_id", 
            AttributeType: "S"
        }, 
        {
            AttributeName: "timestamp", 
            AttributeType: "N"
        }
     ], 
     KeySchema: [
        {
            AttributeName: "user_id", 
            KeyType: "HASH"
        }, 
        {
            AttributeName: "timestamp", 
            KeyType: "RANGE"
        }
     ],
     ProvisionedThroughput: {
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
}, function(err, data) {
        if (err) console.log(err); // an error occurred
        else     console.log(JSON.stringify(data, null, 2));           // successful response
});



/*****************UPDATE TABLE******************** */
// dynamodb.updateTable({
//     TableName:'td_notes_sdk',
//     ProvisionedThroughput: {
//             ReadCapacityUnits: 2, 
//             WriteCapacityUnits: 1
//         }
// }, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(JSON.stringify(data, null, 2));           // successful response
// });

/*****************DELETE TABLE******************** */
// dynamodb.deleteTable({
//       TableName:'td_notes_sdk'
// }, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(JSON.stringify(data, null, 2));           // successful response
// });

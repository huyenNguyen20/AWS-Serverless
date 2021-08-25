const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();
/*************GET************* */
// docClient.get({
//     TableName : 'td_notes_sdk',
//     Key: {
//        user_id: "aa",
//        timestamp: 1
//     },
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************QUERY************* */
// docClient.query({
//     TableName : 'td_notes_sdk',
//     KeyConditionExpression: "user_id = :userId",
//     ExpressionAttributeValues:{
//         ':userId': 'aa'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************SCAN************* */
// docClient.scan({
//     TableName : 'td_notes',
//     FilterExpression : 'cat = :c',
//     ExpressionAttributeValues : {':c' : 'general'}
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************SCAN************* */
// docClient.batchGet({
//     RequestItems: {
//         'td_notes': {
//           Keys: [
//             { 
//                 user_id: 'sfgsrtw3d',
//                 timestamp: 1629260048
//             },
//           ]
//         },
//         'td_notes_sdk': {
//           Keys: [
//             { 
//                 user_id: 'aa',
//                 timestamp: 1629260048
//             }
//           ]
//         }
//       }
    
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })
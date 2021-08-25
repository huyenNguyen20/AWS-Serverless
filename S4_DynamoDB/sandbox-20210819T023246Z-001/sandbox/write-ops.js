const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();
/*************CREATE************* */
// docClient.put({
//     TableName : 'td_notes_sdk',
//     Item: {
//        user_id: "aa",
//        timestamp: 1,
//        title: "First Note",
//        content: "First Note Content"
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************UPDATE************* */
// docClient.update({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: "xkjafakjdk",
//         timestamp: 1, 
//     },
//     UpdateExpression: 'set #t = :t',
//     ExpressionAttributeNames: {
//         '#t' : 'title'
//     },
//     ExpressionAttributeValues: {
//         ':t' : 'Updated Title'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************DELETE************* */
// docClient.delete({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: "xkjafakjdk",
//         timestamp: 1, 
//     },
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(JSON.stringify(data, null, 1))
//     }
// })

/*************BATCH WRITE (Delete/Update/Create Multiple Items at Once)************* */
docClient.batchWrite({
    RequestItems: {
        'td_notes_sdk': [
          {
            DeleteRequest: {
                Key: {
                    user_id: "aa",
                    timestamp: 1, 
                }
            }
          },
          {
            PutRequest: {
              Item: {
                    user_id: "bb",
                    timestamp: 2,
                    title: "Second Note",
                    content: "Second Note Content"
              },
              Item: {
                    user_id: "cc",
                    timestamp: 3,
                    title: "Third Note",
                    content: "Third Note Content"
              }
            }
          }
        ]
      }
}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(data, null, 1))
    }
})


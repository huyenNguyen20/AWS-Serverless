const aws = require('aws-sdk');
aws.config.update({region: 'ap-southeast-1'});
const lambda = new aws.Lambda({
    endpoint: "http://127.0.0.1:3001/"
});

lambda.invoke({
    FunctionName: 'HelloWorldFunction',
    Payload: Buffer.from('{}')
},(err, data) => {
    if (err) console.log(err);
    else if(data) console.log(data);
})


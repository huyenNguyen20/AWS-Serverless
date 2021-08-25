## Serverless Framework
![serverless](https://www.serverless.com/static/serverless-framework-235f7e57983d270320cba8f86ec0ea65.svg)
### Serverless Framework + AWS CloudFormation
**Serverless - AWS CLI**
* `sls deploy -s prod` => Deploy the app to AWS Cloud Formation
* `sls invoke -f function_name` => Test Function locally
* `sls offline` => Test App on Local Network (localhost)
* `sls logs -f function_name -s stage_name --tail` => Watch Logs of a specific function
* `sls remove` => Remove the CloudFormation Stack
* `sls create --template aws-nodejs --path sls-cicd` => Create a new project
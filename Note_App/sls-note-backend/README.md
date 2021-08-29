## NOTES APP
Notes App is an application used to take notes. The app helps user to create, update, delete, and retrieve notes. The app is built with AWS Serverless Services (Lambda, DynamoDB, API Gateway, CloudFormation, SAM) and Serverless Framework.
### Features
#### How to run
* `npm install` => Install necessary packages
* `sls deploy -s prod` => Deploy codes to AWS CloudFormation
* `sls offline` => Run app locally for testing
* `sls create_domain` => Create a custom domain (After you finish setups at Route53 and ACM (ACM should be setup at us-east-1))
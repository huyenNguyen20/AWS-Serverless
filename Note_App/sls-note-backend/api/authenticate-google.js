/**
 * Route: GET /auth
 */
 const AWS = require('aws-sdk');
 AWS.config.update({region: 'ap-southeast-1'});

 const jwtDecode = require('jwt-decode');
 const utils = require('./utils.js');
 
 const cognitoidentity = new AWS.CognitoIdentity();
 const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;
 
 exports.handler = async (event) => {
     try {
         let id_token = utils.getIDToken(event.headers);
         console.log(id_token);
         let params = {
             IdentityPoolId: identityPoolId,
             Logins: {
                 'accounts.google.com': id_token
             }
         }
         // Cognito generates new IdentityID. Otherwise, it would return the existing IdentityID
         let data = await cognitoidentity.getId(params).promise();
         
         params = {
            IdentityId: data.IdentityId,
            Logins: {
                'accounts.google.com': id_token
            }
         }
         // Cognito generates a temporary AWS credentials
         data = await cognitoidentity.getCredentialsForIdentity(params).promise();
         let decoded = jwtDecode(id_token);
         data.user_name = decoded.name;

         return {
             statusCode: 200,
             headers: utils.getResponseHeaders(),
             body: JSON.stringify(data)
         }
     } catch (err) {
         console.error(err)
         return {
             statusCode: err.statusCode || 500,
             headers: utils.getResponseHeaders(),
             body: JSON.stringify({
                 name: err.name || "Exception",
                 message: err.message || "Unknown Cause"
             })
         }
     }
 }
const async = require('async');
const _ = require("underscore");
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-1'});

const docClient = new AWS.DynamoDB.DocumentClient();


var startKey = {};
var results = [];
var pages = 0;
async.doWhilst(
    //iteratee
    (callback) => {
        console.log("In Iteratee")
        let params = {
            TableName: 'td_notes',
            Limit: 2
        };

        if(!_.isEmpty(startKey)){
            params.ExclusiveStartKey = startKey;
        }

        docClient.scan(params, (err, data) => {
            if(err){
                console.log(err);
                callback(err, {});
            } else {
                console.log('data ---', data)
                if(typeof data.LastEvaluatedKey !== "undefined"){
                    startKey = data.LastEvaluatedKey;
                } else {
                    startKey = [];
                }

                if(!_.isEmpty(data.Items)){
                    results = _.union(results, data.Items);
                }
                pages ++;

                callback(null, results);
            }
        })
    },
    //test
    (results, callback) => {
        console.log("In Test")
        if(_.isEmpty(startKey)){
            return callback(null, false);
        } else {
            return callback(null, true);
        }
    },
    //callback
    (err, data) => {
        console.log("In Callback")
        if(err){
            console.log(err);
        } else {
            //console.log(data);
            console.log("Item Count: ", data.length );
            console.log("Pages: ", pages);
        }
    }
)
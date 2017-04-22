/*jslint es6 */
'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;

module.exports.listByUserId = function (event, context, callback) {
   const id = event.pathParameters.userId;

   const done = function (err, data) {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      return callback(null, response.OK(data.Items))
   };


   let params = {
     TableName: 'qauctionTable',
     FilterExpression : 'userID = :user_id',
     ExpressionAttributeValues : {':user_id' : id}
   };

   dynamo.scan(params, done);
}

module.exports.listLive = function (event, context, callback) {
   const done = function (err, data) {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      return callback(null, response.OK(data.Items))
   };


   let params = {
     TableName: 'qauctionTable',
     FilterExpression : '#state = :state_value and attribute_exists(#userID)',
     ExpressionAttributeValues : {':state_value' : 1},
     ExpressionAttributeNames: {
       '#state': 'state',
       '#userID': 'userID'
     }
   };

   dynamo.scan(params, done);
}

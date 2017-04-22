/*jslint es6 */
'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;

module.exports.get = function (event, context, callback) {
   const id = event.pathParameters.id;

   const done = function (err, data) {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      return callback(null, response.OK(data.Item))
   };

   let params = {
     Key: {
       id: id
     },
     TableName: 'qauctionTable'
   };

   dynamo.get(params, done);
}

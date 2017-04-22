'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;

module.exports.favlist = function (event, context, callback) {
   let body = JSON.parse(event.body);
   if ( !body.list ) {
     return callback(new Error('Wrong request parameters !'));
   }
   const done = function (err, data) {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      return callback(null, response.OK(data.Responses))
   };

   let params = {
      RequestItems: {
        'qauctionTable': {
          Keys: []
        }
      }
   };
   for (let id of body.list ) {
     params.RequestItems['qauctionTable'].Keys.push({id: id});
   }
   dynamo.batchGet(params, done);
}

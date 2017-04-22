/*jslint es6 */
'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;

module.exports.update = function (event, context, callback) {
  const timestamp = new Date().getTime();
  const body = JSON.parse(event.body);
  const id = event.pathParameters.id;

  let params = {
     Key: {
       id: id
     },
     ExpressionAttributeNames: {
       '#qa_title': 'name',
       '#qa_state': 'state',
       '#qa_user': 'user'
     },
     ExpressionAttributeValues: {
      ':qa_title': body.name,
      ':description': body.description,
      ':qa_state': body.state,
      ':lots': body.lots,
      ':qa_user': body.user,
      ':updatedAt': timestamp
     },
     UpdateExpression: 'SET #qa_title = :qa_title, description = :description, #qa_state = :qa_state, lots = :lots, #qa_user = :qa_user, updatedAt = :updatedAt',
     TableName: 'qauctionTable',
     ReturnValues: 'ALL_NEW'
   };

   const done = function (err, data) {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      return callback(null, response.OK(data.Attributes))
   };

   dynamo.update(params, done);
}

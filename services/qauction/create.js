/*jslint es6 */
'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;
const uuid = require('uuid');

module.exports.create = (event, context, callback) => {
   const body = JSON.parse(event.body);
   const timestamp = new Date().getTime();

   if ( !body.lots && !body.user ) {
     const ERROR_MESSAGE = 'Data format error';
     console.error(ERROR_MESSAGE);
     return callback(response.BAD(ERROR_MESSAGE));
   }
   const params = {
    TableName: 'qauctionTable',
    // 'ReturnConsumedCapacity': 'TOTAL',
    Item: {
      id: uuid.v1(),
      name: body.name,
      description: body.description,
      state: body.state,
      lots: body.lots,
      userID: body.user.id,
      user: body.user,
      bids: {},
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ReturnValues: 'ALL_OLD'
  };
   const done = (err, data) => {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      if ( data.Item ) {
        return callback(null, response.OK(data.Attributes))
      }
      callback(null, response.OK(params.Item))
   }

  dynamo.put(params, done);

};


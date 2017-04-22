/*jslint es6 */
'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('./core').response;
const uuid = require('uuid');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '330663',
  key: '42f980d0d947a986306f',
  secret: '06a1412baa20ecdead46',
  encrypted: true
});

module.exports.create = (event, context, callback) => {
   const body = JSON.parse(event.body);
   const timestamp = new Date().getTime();

   if ( !body.bidValue && !body.userId ) {
     const ERROR_MESSAGE = 'Data format error';
     console.error(ERROR_MESSAGE);
     return callback(response.BAD(ERROR_MESSAGE));
   }

   let params = {
     Key: {
       id: event.pathParameters.id,
     },
     ExpressionAttributeNames: {
       '#qa_lots': 'lots',
       '#qa_bids': 'bids'
     },
     ExpressionAttributeValues: {
      ':updatedAt': timestamp
     },
     UpdateExpression: 'SET  #qa_lots = :lots, #qa_bids = :bids, updatedAt = :updatedAt',
     TableName: 'qauctionTable',
     ReturnValues: 'ALL_NEW'
   };

   const done = (err, data) => {
      if ( err ) {
        console.error(err);
        return callback(response.BAD('Create QAuction Error!'));
      }
      if ( data.Attributes ) {
        return callback(null, response.OK(data.Attributes))
      }
      callback(null, response.OK(params.Attributes))
   }

   const check = ( err, data ) => {
     let attrs = data.Item;

      if ( !attrs.bids ) {
        attrs.bids = {};
      }

       let lot = attrs.lots[body.lotIndex]
       let shouldUpdateBids = false;

       if ( !lot.currentPrice && lot.startPrice <= body.bidValue ) {
         lot.currentPrice = body.bidValue;
         shouldUpdateBids = true;
       } else if (lot.currentPrice && lot.currentPrice < body.bidValue) {
         lot.currentPrice = body.bidValue;
         shouldUpdateBids = true;
       }

       if ( shouldUpdateBids ) {
        if ( attrs.bids[body.userId] ) {
          attrs.bids[body.userId][body.lotIndex] = body.bidValue;
        } else {
          attrs.bids[body.userId] = {};
          attrs.bids[body.userId][body.lotIndex] = body.bidValue;
        }
        params.ExpressionAttributeValues[':bids'] = attrs.bids;
        params.ExpressionAttributeValues[':lots'] = attrs.lots;
        pusher.trigger(attrs.userID, 'bid', {
            'auctionName': attrs.name,
            'lotName': lot.name,
            'startPrice': lot.startPrice,
            'currentPrice': lot.currentPrice
        });
        dynamo.update(params, done);
       } else {
         callback(null, response.BAD('You bid was not allowed !'));
       }
   }

  dynamo.get({
     Key: {
       id: event.pathParameters.id
     },
     TableName: 'qauctionTable'
   }, check)

};


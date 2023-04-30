const AWS = require('aws-sdk');

// Set the AWS region
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;

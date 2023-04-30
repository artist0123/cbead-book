const ddbClient = require("@aws-sdk/lib-dynamodb");
const AWS = require("@aws-sdk/client-dynamodb");

const client = new AWS.DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ASIAX4DTSJABMGXOLOCT", // ใส่ Access Key ID ที่มีสิทธิ์เข้าถึง DynamoDB
    secretAccessKey: "QGnBr3f9XvBOw38aoLUguFmAFF7rnPTm4neQnBKh", // ใส่ Secret Access Key ที่มีสิทธิ์เข้าถึง DynamoDB
    sessionToken:
      "FwoGZXIvYXdzEIH//////////wEaDDmjmnl4blmOzkqgyyLIAZCTQAXC+P/gfdDhq1LUqMW8W3LKlb/Jh2RO0ibl/cYdS2Kx1zkOTuHUwf2imgacJqdq5NNmXH7lHC7UCMkKUexwJgHkG7xmDojLzq9YZ2JnJQuIlSOrSwc/N96xUWNv5/qY6HFQ8P3UwIeCJ33s7hdlZ6520tL650tbkauJJMz8fexyWWVP2/zv/E+/7htLcmG5UPFUatkz4i33GvX8UjfJ13CGqqr+QBnHNFRFAtURYlgp1n1xCSBhQJWEBUjOdQHVk+RhzOEyKMf7tKIGMi2L4gfBjClOURNWAnZdAngC8R0NvHiA5d7td5PfXs6fKGDTZlmw3MGsDr2DnR0=",
  },
});
const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
const documentClient = ddbClient.DynamoDBDocumentClient.from(
  client,
  translateConfig
);
module.exports = documentClient;

//AKIAUPBD4PZLMAKGRZTG
//zbNFqdC87+5CD15jjvSgIG+47CkoF9TCu8iTAZ+j

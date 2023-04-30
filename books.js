const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
// const documentClient = require("./dynamoDBClient");
const dynamoDB = require('./dynamodb');
const port = 3000;
app.use(cors())

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/book", async (req, res) => {
  const response = await dynamoDB.send(
    new ScanCommand({
      TableName: "book",
    })
  );
  console.log(response);
  res.send(response.Items)
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at 0.0.0.0:${port}`);
});

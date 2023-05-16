const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const { ScanCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const documentClient = require("./dynamoDBClient");
const port = 3000;
app.use(cors())

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", async (req, res) => {
  const response = await documentClient.send(
    new ScanCommand({
      TableName: "books",
    })
  );
  console.log(response);
  res.send(response.Items)
});

//(ทดลอง) get book แบบกำหนด id
app.get("/books/:id", async (req, res) => {
  const getBookById = await documentClient.send(
    new QueryCommand({
      TableName : 'books',

      //คำสั่ง Query ต้องมี 2 ตัวนี้
      KeyConditionExpression : "id = :id", //"id (attribute ใน dynamo) = :id (ค่าที่จะใช้ค้นหา)"
      ExpressionAttributeValues : {":id" : req.params.id} //ใส่ค่าที่จะค้นหาลงไปก็คือง่ายๆว่า :id = "kfspkf94431lk2nml" มันก็จะเอาค่าเราไป query
    })
  )
  res.send(getBookById)
  console.log(getBookById);
})

//Add ได้แล้ว
app.post("/books", async (req, res) => {
  let body = req.body
  let data = {
    id : body.id,
    authors : body.authors,
    desc : body.desc,
    genres : body.genres,
    image : body.image,
    language : body.language,
    quantity : body.quantity,
    title : body.title
  }
  const createBook = await documentClient.send(
    new PutCommand({
      TableName : "books",
      Item : data
    })
  )
  res.send(createBook)
})

//Delete ได้แล้ว
app.delete("/books/:id", async (req, res) => {
  const deleteBook = await documentClient.send(
    new DeleteCommand({
      TableName : "books",
      Key : {
        'id' : req.params.id
      }
    })
  )
  res.send(deleteBook)
})

app.put("/books/:id", async (req, res) => {
  const updateBook = await documentClient.send(
    new UpdateCommand({
      TableName : "books",
      Key : {
        'id' : req.params.id
      },
      UpdateExpression : "set "
    })
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
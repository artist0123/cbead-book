const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = "books";

app.get("/books", (req, res) => {
  const params = {
    TableName: tableName,
  };

  dynamoDb.scan(params, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Error fetching books" + error });
    } else {
      res.json(data.Items);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
  };

  dynamoDb.get(params, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Error fetching book" + error });
    } else {
      res.json(data.Item);
    }
  });
});

app.post("/books", (req, res) => {
  const body = req.body
  const params = {
    TableName: tableName,
    Item: {
      id : uuidv4(),
      authors : body.authors,
      desc : body.desc,
      genres : body.genres,
      image : body.image,
      language : body.language,
      quantity : body.quantity,
      title : body.title,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      res.status(500).json({ error: "Error adding book " + error });
    } else {
      res.json(params.Item);
    }
  });
});

app.put("/books/:id", (req, res) => {
  const body = req.body;

  const params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
    UpdateExpression:
      "SET authors = :authors, #dsc = :desc, genres = :genres, image = :image, #lan = :language, quantity = :quantity, title = :title",
    ExpressionAttributeNames: {
      "#dsc": "desc",
      "#lan": "language",
    },
    ExpressionAttributeValues: {
      ":authors": body.authors,
      ":desc": body.desc,
      ":genres": body.genres,
      ":image": body.image,
      ":language": body.language,
      ":quantity": body.quantity,
      ":title": body.title
    },
    ReturnValues: "ALL_NEW",
  };

  dynamoDb.update(params, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Error updating book " + error });
    } else {
      res.json(data.Attributes);
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
  };

  dynamoDb.delete(params, (error) => {
    if (error) {
      res.status(500).json({ error: "Error deleting book " + error });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
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
  const { id, authors, desc, genres, image, language, quantity, title } =
    req.body;

  const params = {
    TableName: tableName,
    Item: {
      id,
      authors,
      desc,
      genres,
      image,
      language,
      quantity,
      title,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      res.status(500).json({ error: "Error adding book" + error });
    } else {
      res.json(params.Item);
    }
  });
});

app.put("/books/:id", (req, res) => {
  const { authors, desc, genres, image, language, quantity, title } = req.body;

  const params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
    UpdateExpression:
      "SET authors = :authors, #dsc = :desc, genres = :genres, image = :image, #lan = :language, quantity = :quantity, title = :title",
    ExpressionAttributeValues: {
      ":authors": authors,
      ":desc": desc,
      ":genres": genres,
      ":image": image,
      ":language": language,
      ":quantity": quantity,
      ":title": title,
    },
    ExpressionAttributeNames: {
      "#dsc": "desc",
      "#lan": "language",
    },
    ReturnValues: "ALL_NEW",
  };

  dynamoDb.update(params, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Error updating book" + error });
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
      res.status(500).json({ error: "Error deleting book" - error });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

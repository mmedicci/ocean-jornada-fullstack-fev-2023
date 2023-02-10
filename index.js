const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:GPfXUJ5JRdxzTjF6@cluster0.upxmnka.mongodb.net";

// nome da collection

const DB_NAME = "ocean-bancodedados-09-02-23";

async function main() {

  // conexão com banco de dados
  console.log("Conectando com o banco de dados...");
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("itens");
  console.log("banco de dados conectado com sucesso")

  const app = express();

  // o que vier no body da requisição, esta em JSON
  app.use(express.json());

  //cria endpoint / -> Hello world

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  // endpoit /oi -> Olá, mundo!
  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  // Lista de informações
  const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"];
  //                0                   1             2

  //CRUD -> Lista de informações

  // Endpoint Raed All -> [GET] /item

  app.get("/item", async function(req, res) {
    const documentos = await collection.find().toArray(); 
    res.send(documentos);
  });

  // Enpoint Read Single by ID -> [GET]/item/:id
  app.get("/item/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) }); //{para filtrar}
    res.send(item);
  });

  // Endpoint create -> [POST] /item

  app.post("/item", async function (req, res) {
    //console.log(req.body);
    const item = req.body;
    await collection.insertOne(item)
    res.send(item);
  });

  // endpoint Update -> [PUT]/item/:id 
  app.put("/item/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;

    console.log(id, body);
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    res.send("deu bom")
  })



  app.listen(3000);
}

main();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());

const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
app.use(bodyParser.json());
const corsConfig = {
  origin: "*",
  headers: "Content-Type",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

const uri = "mongodb+srv://jannat:jannat123@cluster0.yichpba.mongodb.net/?retryWrites=true&w=majority&appName=techno-iwasa";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const categorys = client.db("techno-iwasa").collection("categorys");
const users = client.db("techno-iwasa").collection("users");
const products = client.db("techno-iwasa").collection("products");




exports.users = users;
exports.products = products;
exports.categorys = categorys;
const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
const corsConfig = {
  origin: "",
  headers: "Content-Type",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

const uri = "mongodb+srv://shohanur:SiNRSxd1HZHIyhJ8@cluster0.yichpba.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const categorys = client.db("techno-iwasa").collection("categorys");
    const users = client.db("techno-iwasa").collection("users");
    const products = client.db("techno-iwasa").collection("products");

    // Middleware for parsing JSON data
    app.use(express.json());

    //Export Collection
    module.exports = {
      categorys,
      users,
      products
    };

    // Routes
    const userRoutes = require("./modules/users/user.routes");
    app.use("/user", userRoutes);
    const categoryRoutes = require("./modules/category/category.routes");
    app.use("/category", categoryRoutes);
    const productRoutes = require("./modules/product/product.routes");
    app.use("/product", productRoutes);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const categorysCollection = client.db("techno-iwasa").collection("categorys");
const usersCollection = client.db("techno-iwasa").collection("users");
const products = client.db("techno-iwasa").collection("products");

app.get("/", (req, res) => {
  res.send("Hello World!");
});



///////////////////////////////////////////////////////////////////////////////////////////////////
//<--------------------------| User Data |--------------------------->
//////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/user", async (req, res) => {
  const user = await usersCollection.find({}).toArray();

  res.status(200).json(user);
});
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if the password is correct
    const passwordMatch = (await password) === user.password;

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_TOKEN);

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error logging in user ssoososo:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.post("/user/curent-user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, "1231");

    // Attach the user's information to the request object
    req.user = decoded;

    res.json(req.user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});
app.get("/user/:id", async (req, res) => {
  const id = req.params.id
  console.error(id)
  if (id) {

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    return res.status(200).json(user);
  } else {
    return res.status(401).json("error");
  }
});





///////////////////////////////////////////////////////////////////////////////////////////////////
//<--------------------------| Category Data |--------------------------->
//////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/user", async (req, res) => {
  const user = await usersCollection.find({}).toArray();

  res.status(200).json(user);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

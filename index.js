const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
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


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Connect the client to the server	(optional starting in v4.7)


    // Middleware for parsing JSON data

    //Export Collection




    // Routes
    const userRoutes = require("./modules/users/user.routes");
    app.use("/user", userRoutes);
    const categoryRoutes = require("./modules/category/category.routes");
    app.use("/category", categoryRoutes);
    const productRoutes = require("./modules/product/product.routes");
    app.use("/product", productRoutes);

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

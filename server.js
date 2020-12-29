//Dependencies//

const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

//generating the app with express//
const app = express()

//establishing our db with mongoose//
const db= mongoose.connection

//requiring dotenv for configuration//
require("dotenv").config()


//database with product info///
const Product = require("./models/products.js");
const productSeed = require("./models/seed.js"); //seed of products


//estabing our listening PORT variables//
const PORT = process.env.PORT || 3005

//connecting to mongoose//
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

//Error Handlers//
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware & Body Parser//
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride("_method"))

//Routes//
app.get("/", (req, res) => {
  res.send("Hello World you know it")
})


//Listener///
app.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
})

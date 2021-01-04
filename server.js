//Dependencies//

const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const session = require("express-session")

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



//Middleware & Body Parser//
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

//Database//
mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("the connection with mongod is established at", MONGODB_URI);
  }
)

//Error Handlers//
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Controllers //

const productsController = require("./controllers/products.js")
app.use("/products", productsController)

const sessionsController = require("./controllers/sessions.js")
app.use("/sessions", sessionsController)

const usersController = require("./controllers/users.js")
app.use("/users", usersContoller)

//Routes//
app.get("/", (req, res) => {
  // res.send("Hello World you know it")
  res.redirect("/products")
})



//Listener///
app.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
})

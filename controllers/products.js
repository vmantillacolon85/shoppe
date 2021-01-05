const express = require("express");
const products = express.Router(); //configuration
// database with product info///
const Product = require("../models/products.js");

//Seed Route //

products.get("/seed", (req, res) => {
  Product.create(
    [
    {
      name: "Shirt",
      description:"soft, breatheable, supima cotton",
      price: 40,
      qty: 35,
      img: "/images/supimacottontshirt.jpeg"
    },
    {
      name: "Leather-Sandals",
      description: "supple, calf-skin leather",
      price: 200,
      qty: 22,
      img: "/images/leathersandals.jpeg"
    },
    {
      name: "Cross-Body-Bag",
      description: "nylon with metal hardware, multiple pockets",
      price: 125,
      qty: 50,
      img: "/images/crossbodybag.jpg"
    },
    {
      name: "Slim-Fit-Jeans",
      description: "black, Japanese denim, slim fit",
      price: 100,
      qty: 15,
      img: "/images/slimfitjeans.jpg"
    }
  ],
  (error, data) => {
    res.redirect("/products")
  }
  )
})

//Index products//

products.get("/", (req, res) => {
  Product.find({}, (error, foundProducts) => {
    res.render(
      "products/index.ejs",
      {
        products: foundProducts
      }
    )
  });
});
//you can alsoe use foundProducts instead of allProducts///

//Buy products//

products.put("/:id/buy", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    { new: true },
    (error, updatedProduct) => {
      res.redirect(`/products/${req.params.id}`)
  });
});

//Edit products///

products.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render(
      "products/edit.ejs",
      {
        product: foundProduct
      }
    )
  });
});

//Put products//

products.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedProduct) => {
    // res.send(updatedProduct);
      res.redirect(`/products/${req.params.id}`)
    });
});

//Post products///

products.post("/", (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect("/products");
  });
});

//New products///

products.get("/new", (req, res) => {
  res.render("products/new.ejs");
});


//Show products///

products.get("/:id", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    // console.log(foundProduct);
    res.render(
      "products/show.ejs",
      {
        product: foundProduct
      }
    )
  });
});

//Delete products//

products.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, deletedProduct) => {
    res.redirect("/products")
  });
});


module.exports = products;

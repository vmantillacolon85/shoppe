const express = require("express");
const products = express.Router(); //configuration
// database with product info///
const Product = require("../models/products.js");

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
      return next()
  } else {
    res.redirect("/sessions/new")
  }
}

//products.use(isAuthenticated)
//this will result in the user not being able to see or do anything on the page without being logged. all of the routes below become "protected routes"--meaning you cannot do anything with the routes without being logeed in, ie. you cannot view/show the product, you cannot create/post a product, you cannot edit or delete a product etc, without being logged. in. //


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

// Root Route//
// products.get("/", (req, res) => {
//   // res.send("Hello World you know it")
//   res.redirect("/products")
// })

//Index products//

products.get("/", (req, res) => {
  Product.find({}, (error, foundProducts) => {
    res.render(
      "products/index.ejs",
      {
        products: foundProducts,
        currentUser: req.session.currentUser
      })
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
        product: foundProduct,
        currentUser: req.session.currentUser
      })
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
      res.redirect("/products")
    });
});

// products.put("/:id", isAuthenticated, (req, res) => {
//   Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (error, updatedProduct) => {
//     // res.send(updatedProduct);
//       res.redirect(`/products/${req.params.id}`)
//     });
// });


//Post products///

products.post("/", (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect("/products");
  });
});

//New products///

products.get("/new", (req, res) => {
  res.render(
    "products/new.ejs",
    {currentUser: req.session.currentUser}
  )
});


//Show products///

products.get("/:id", (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    // console.log(foundProduct);
    res.render(
      "products/show.ejs",
      {
        product: foundProduct,
        currentUser: req.session.currentUser
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

//Drop DB Route //

products.get("/dropdatabase/cannotundo/areyoursure/reallysure/okthen", (req, res) => {
  Product.collection.drop()
  res.send("You did it! You dropped the database")
  }
)


module.exports = products;

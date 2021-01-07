const bcrypt = require("bcrypt")
const express = require("express");
const sessions = express.Router(); //configuration
// database with product info///
const User = require("../models/users.js");


sessions.get("/new", (req, res) => {
  res.render("sessions/login.ejs", { currentUser: req.session.currentUser})
});

sessions.post("/", (req, res) => {
  //looking for the username ///
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (error) {
      console.log(error);
      res.send("oops the db had a problem")
    } else if (!foundUser) {
      res.send('<a href="/">Sorry User not found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect("/products")
      } else {
        res.send('<a href="/">Password does not match</a>')
      }
    }
  })
});


sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/products")
  })
})


module.exports = sessions

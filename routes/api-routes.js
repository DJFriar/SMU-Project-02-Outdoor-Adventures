/* eslint-disable prefer-arrow-callback */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Get all parks
  app.get("/api/parks", function(req, res) {
    db.Post.all(function(data) {
      const hbsObject = {
        parks: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  // Get all profiles
  app.get("/api/profiles", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/parks", (req, res) => {
    db.Park.create({
      name: req.body.name,
      designation: req.body.designation,
      parkid: req.body.parkid
    }).then(() => {
      res.status(202).send();
    });
  });

  app.put("/api/addWishlistPark/:parkid", (req, res) => {
    const parkCode = req.params.parkid;
    console.log("Adding " + parkCode + " to user wishlist");
    db.WishlistPark.create({
      userID: req.user.id,
      parkID: parkCode
    }).then(() => {
      res.status(202).send();
    });
  });

  app.delete("/api/delWishlistPark/:parkid", (req, res) => {
    const id = req.params.parkid;
    console.log("Removing " + id + " from wishlist");
    db.WishlistPark.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(202).send();
    });
  });

  app.put("/api/addVisitedPark/:parkid", (req, res) => {
    const parkCode = req.params.parkid;
    console.log("Adding " + parkCode + " to user visited list");
    db.VisitedPark.create({
      userID: req.user.id,
      parkID: parkCode
    }).then(() => {
      res.status(202).send();
    });
  });

  app.delete("/api/delVisitedPark/:parkid", (req, res) => {
    const id = req.params.parkid;
    console.log("Removing " + id + " from visited list");
    db.VisitedPark.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.status(202).send();
    });
  });
};

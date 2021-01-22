// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
//const sequelize = require("sequelize");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("login");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    // Get all profiles
    db.Park.findAll({}).then(data => {
      const newArray = data.map(element => {
        return element.dataValues;
      });
      const hbsObject = {
        parks: newArray
      };
      console.log(hbsObject);
      res.render("profile", hbsObject);
    });
  });

  app.get("/parks", isAuthenticated, (req, res) => {
    // Get all parks
    db.Park.findAll({}).then(data => {
      const newArray = data.map(element => {
        return element.dataValues;
      });
      const hbsObject = {
        parks: newArray
      };
      //console.log(hbsObject);
      res.render("parks", hbsObject);
    });
  });

  app.get("/parks/search", (req, res) => {
    let parkName;
    let statesArr;
    let queryStringTwo = "Select * From parks Where";

    if (req.query.name) {
      parkName = req.query.name;
      queryStringTwo += ` locate('${parkName}', name)>0`;
    }
    if (req.query.states) {
      statesArr = req.query.states.split(",");
      statesArr.forEach((state, index) => {
        if (index === 0 && parkName) {
          queryStringTwo += ` AND locate('${state}', states)>0`;
        } else if (index === 0 && !parkName) {
          queryStringTwo += ` locate('${state}', states)>0`;
        } else {
          queryStringTwo += ` OR locate('${state}', states)>0`;
        } 
      });
    }
    console.log(queryStringTwo + ";");
    db.sequelize.query(queryStringTwo, {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((results) => {
        const hbsObject = {
          parks: results
        };
        res.render("parks", hbsObject);
      });
  });

  app.get("/parks/:parkid", (req, res) => {
    // Get all parks
    db.Park.findAll({
      where: {
        parkid: req.params.parkid
      }
    }).then(data => {
      const newArray = data.map(element => {
        return element.dataValues;
      });
      const hbsObject = {
        parks: newArray
      };
      console.log(hbsObject);
      res.render("park-detail", hbsObject);
    });
  });

};
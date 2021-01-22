// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const axios = require("axios");
//const sequelize = require("sequelize");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// const { query } = require("express");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/profile", (req, res) => {
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

  app.get("/parks", (req, res) => {
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
    let queryString = "Select * From parks Where";

    if (req.query.name) {
      parkName = req.query.name;
      queryString += ` locate('${parkName}', name)>0`;
    }
    if (req.query.states) {
      statesArr = req.query.states.split(",");
      statesArr.forEach((state, index) => {
        if (index === 0 && parkName) {
          queryString += ` AND locate('${state}', states)>0`;
        } else if (index === 0 && !parkName) {
          queryString += ` locate('${state}', states)>0`;
        } else {
          queryString += ` OR locate('${state}', states)>0`;
        } 
      });
    }
    if (!req.query.name && !req.query.states) {
      queryString = "Select * From parks";
    }

    db.sequelize.query(queryString, {
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

    const parkCode = req.params.parkid;
    const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF";
    const url = "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey + "&parkCode=" + parkCode;
    
    axios.get(url).then((response) => {
      const parkObj = response.data.data[0];
      console.log(parkObj);
      res.render("park-detail", parkObj);
    });
   
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
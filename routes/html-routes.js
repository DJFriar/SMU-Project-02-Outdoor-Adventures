// Requiring path to so we can use relative routes to our HTML files
require("dotenv").config();
const db = require("../models");
const axios = require("axios");
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
    let desArr;
    let queryString = "Select * From parks Where";   

    if (req.query.name) { parkName = req.query.name; }
    if (req.query.states) { statesArr = req.query.states.split(","); }
    if (req.query.des) { desArr = req.query.des.split(","); }

    if (parkName && statesArr && desArr) {
      for (let i = 0; i < statesArr.length; i++) { 
        for (let j = 0; j < desArr.length; j++) {
          queryString += (i === 0 && j === 0) ? " " : " OR "; 
          queryString += `locate('${parkName}', name)>0 AND locate('${statesArr[i]}', states)>0 AND designation = '${desArr[j]}'`;
        }
      }
    } else if (statesArr && desArr) {
      for (let i = 0; i < statesArr.length; i++) { 
        for (let j = 0; j < desArr.length; j++) {
          queryString += (i === 0 && j === 0) ? " " : " OR ";
          queryString += `locate('${statesArr[i]}', states)>0 AND designation = '${desArr[j]}'`;
        }
      }
    } else if (parkName && statesArr) {
      for (let i = 0; i < statesArr.length; i++) {
        queryString += (i === 0) ? " " : " OR ";
        queryString += `locate('${parkName}', name)>0 AND locate('${statesArr[i]}', states)>0`;
      }
    } else if (parkName && desArr) {
      for (let i = 0; i < desArr.length; i++) {
        queryString += (i === 0) ? " " : " OR ";
        queryString += `locate('${parkName}', name)>0 AND designation = '${desArr[i]}'`;
      }
    } else {
      if (parkName) { queryString += ` locate('${parkName}', name)>0;`; } 
      else if (statesArr) {
        for (let i = 0; i < statesArr.length; i++) {
          queryString += (i === 0) ? " " : " OR ";
          queryString += ` locate('${statesArr[i]}', states)>0`;
        } 
      } else if (desArr) {
        for (let i = 0; i < desArr.length; i++) {
          queryString += (i === 0) ? " " : " OR ";
          queryString += `designation = '${desArr[i]}'`;
        }
      }
    }

    console.log("---------------------------------");
    console.log(queryString);

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
    const apiKey = process.env.APIKEY;
    const url = "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey + "&parkCode=" + parkCode;
    
    axios.get(url).then((response) => {
      const parkObj = response.data.data[0];
      console.log(parkObj);
      res.render("park-detail", parkObj);
    });
  });
};
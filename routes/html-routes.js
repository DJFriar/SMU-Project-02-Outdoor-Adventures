require("dotenv").config();
// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("signup");
    }
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("login");
    }
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    db.sequelize.query("SELECT * FROM Profiles pr INNER JOIN Parks p ON pr.parkID = p.parkID WHERE userID = " + req.user.id, { 
      type: db.sequelize.QueryTypes.SELECT }).then(data => {
      const hbsObject = {
        profiles: data
      };
      console.log(hbsObject);
      res.render("profile", hbsObject);
    });
  });

  app.get("/parks", isAuthenticated, (req, res) => {
    // Get all parks
    db.Park.findAll({raw: true}).then(data => {
      data.forEach(item => {
        item.statesFormatted = item.states.split(",").join(", ");
      });
      const hbsObject = {
        parks: data
      };
      res.render("parks", hbsObject);
    });
  });

  app.get("/parks/search", (req, res) => {
    let parkName;
    let statesArr;
    let designationArr;
    let queryString = "Select * From parks Where";   

    if (req.query.name) { parkName = req.query.name; }
    if (req.query.states) { statesArr = req.query.states.split(","); }
    if (req.query.des) { designationArr = req.query.des.split(","); }

    if (parkName && statesArr && designationArr) {
      for (let i = 0; i < statesArr.length; i++) { 
        for (let j = 0; j < designationArr.length; j++) {
          queryString += (i === 0 && j === 0) ? " " : " OR "; 
          queryString += `locate('${parkName}', name)>0 AND locate('${statesArr[i]}', states)>0 AND designation = '${designationArr[j]}'`;
        }
      }
    } else if (statesArr && designationArr) {
      for (let i = 0; i < statesArr.length; i++) { 
        for (let j = 0; j < designationArr.length; j++) {
          queryString += (i === 0 && j === 0) ? " " : " OR ";
          queryString += `locate('${statesArr[i]}', states)>0 AND designation = '${designationArr[j]}'`;
        }
      }
    } else if (parkName && statesArr) {
      for (let i = 0; i < statesArr.length; i++) {
        queryString += (i === 0) ? " " : " OR ";
        queryString += `locate('${parkName}', name)>0 AND locate('${statesArr[i]}', states)>0`;
      }
    } else if (parkName && designationArr) {
      for (let i = 0; i < designationArr.length; i++) {
        queryString += (i === 0) ? " " : " OR ";
        queryString += `locate('${parkName}', name)>0 AND designation = '${designationArr[i]}'`;
      }
    } else {
      if (parkName) { queryString += ` locate('${parkName}', name)>0;`; } 
      else if (statesArr) {
        for (let i = 0; i < statesArr.length; i++) {
          queryString += (i === 0) ? " " : " OR ";
          queryString += ` locate('${statesArr[i]}', states)>0`;
        } 
      } else if (designationArr) {
        for (let i = 0; i < designationArr.length; i++) {
          queryString += (i === 0) ? " " : " OR ";
          queryString += `designation = '${designationArr[i]}'`;
        }
      } else {
        queryString = "Select * From parks;";
      }
    } 

    console.log("---------------------------------");
    console.log(queryString);

    db.sequelize.query(queryString, {
      type: db.sequelize.QueryTypes.SELECT
    })
      .then((results) => {
        results.forEach(item => {
          item.statesFormatted = item.states.split(",").join(", ");
        });
        
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
    const paths = ["/images/loginBackground.jpg","/images/loginBackground2.jpg","/images/loginBackground3.webp"
    ];
    const arrayLength = paths.length-1;
    const randomGen = paths[Math.floor(Math.random() * arrayLength) + 1 ];
    console.log(randomGen);
    
    axios.get(url).then((response) => {
      const parkObj = response.data.data[0];
      parkObj.randomImage = randomGen;
      console.log(parkObj);
      res.render("park-detail", parkObj);
    });
  });
};
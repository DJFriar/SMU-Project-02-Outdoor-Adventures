require("dotenv").config();
const axios = require("axios");
const db = require("./models");

function seedParks(cb) {
  const apiKey = process.env.APIKEY;
  axios.get("https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey + "&limit=468")
    .then((response) => {
      // handle success
      const parks = response.data.data;
      const parksArray = [];

      parks.forEach(park => {
        parksArray.push({
          name: park.fullName,
          designation: park.designation,
          parkid: park.parkCode,
          lat: park.latitude,
          long: park.longitude,
          states: park.states
        });
      });

      db.Park.destroy({ truncate : true, cascade: false }).then(() => {
        db.Park.bulkCreate(parksArray).then(() => {
          console.log("parks db populated");
          cb();
        }).catch(error => {
          // handle error
          console.log(error);
        });
      }).catch(err => {
        console.log(err);
      });
    });
}

module.exports = seedParks;
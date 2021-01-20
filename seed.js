const axios = require("axios");
const db = require("./models");

function seedParks(cb) {

  axios.get("https://developer.nps.gov/api/v1/parks?&api_key=3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF&limit=468")
    .then((response) => {
      // handle success
      //console.log(response.data.data);
      const parks = response.data.data;
      const parksArray = [];

      parks.forEach(park => {
        parksArray.push({
          name: park.fullName,
          designation: park.designation,
          parkid: park.parkCode
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
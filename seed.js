function seedParks() {
  const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF&limit=468";
  const queryUrl = "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(response => {
    console.log(response);
    let i = 0;
    for (i < response.length; i++;) {
      const name = response.data[i].fullName;
      const designation = response.data[i].designation;
      const parkId = response.data[i].parkCode;
      console.log(parkId);

      $.post("/api/parks", {
        name: name,
        designation: designation,
        parkid: parkId
      });
    }
  });
}
module.exports = {
  seedParks:seedParks
};
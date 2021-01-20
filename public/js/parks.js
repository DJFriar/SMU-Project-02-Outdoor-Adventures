$(document).ready(() => {
  function parks() {
    const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF";
    const queryUrl =
      "https://developer.nps.gov/api/v1/parks?&api_key=" +
      apiKey +
      "&parkCode=yose";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(response => {
      console.log(response);

      const name = response.data[0].fullName;
      const designation = response.data[0].designation;
      const parkId = response.data[0].parkCode;
      console.log(parkId);

      $.post("/api/parks", {
        name: name,
        designation: designation,
        parkid: parkId
      });
    });
  }

  console.log("parksjs running");
  parks();
});

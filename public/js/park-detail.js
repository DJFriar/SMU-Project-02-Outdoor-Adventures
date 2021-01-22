/* eslint-disable no-unused-vars */
$(document).ready(() => {

  const urlPath = window.location.pathname;

  let targetPark = "";

  function fetchParkFromURL() {
    const urlPath = window.location.pathname;
    const trimmedPath = urlPath.substring(7,11);
    targetPark = trimmedPath;
  }

  console.log(targetPark);

  function parks() {
    const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF&limit=468";
    const queryUrl =
      "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey;

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(response => {
      console.log(response);
      let i = 0;
      for (i < response.length; i++; ) {
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

  console.log("parksjs running");
});

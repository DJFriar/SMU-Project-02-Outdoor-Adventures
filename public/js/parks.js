function parks() {
  const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF";
  const queryUrl ="https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(response => {
    console.log(response);
  });
  const name = response.fullName;
  const designation = response.designation;
  const parkId = response.parkCode;
  $.post("/api/parks", {
    name: name,
    designation: designation,
    parkId: parkId
  });
}
parks();

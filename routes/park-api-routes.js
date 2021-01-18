const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF";
const url = "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey;

function parks() {
  $.ajax({
    url: url,
    method: "GET"
  }).then(res => {
    console.log(res);
  });
}
parks();

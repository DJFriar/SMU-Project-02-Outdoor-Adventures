// let targetPark = "";


// function fetchParkFromURl(){
//   const urlPath = window.location.pathname;
//   const trimmedPath = urlPath.substring(7,11);
//   targetPark = trimmedPath;


// }
// fetchParkFromURl();
// console.log(targetPark);

const parkCode = window.location.pathname;
const trimParkCode = parkCode.substring(7, 11);
console.log(trimParkCode);



const apiKey = "3FZIVstmbfxjuxgM1Y85FFUTEClzCGY77bojFJtF";
const url = "https://developer.nps.gov/api/v1/parks?&api_key=" + apiKey + "&parkCode="+trimParkCode;

function parks() {
  $.ajax({
    url: url,
    method: "GET"
  }).then(response => {
    console.log(response);
  
    let description = "";
    let parkImage = "";
    response.data.forEach(element => {


      // for (i < response.data.fore; i++;) {
      const parkId = element.parkCode;
      console.log(parkId);
      if (parkId.trim().toLowerCase() === trimParkCode.trim().toLowerCase()) {
        console.log("What's up?");
        description = element.description;
        parkImage = element.images[0].url;
        parkImageAlt= element.images[0].altText;
      }

      $(".park-detail").text(description);
      const imgEl = $("<img>").attr({
        "src":parkImage,
        "alt":parkImageAlt});
      $(".detail-div").append(imgEl);

    });
    console.log(response.data.length);
  });
}
$(document).ready(parks);
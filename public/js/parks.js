/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  console.log("parks script ran");

  $(".search-form").submit(function (event) {
    event.preventDefault();
    var searchURL = "/parks/search?";
    var states = [];
    var input = $(".search-input").val();
    $(".state-input").each(function() {
      if ($(this).is(":checked")) {
        states.push($(this).val());
      }
    });
    

    if (input !== "" && states.length > 0) {
      searchURL += `name=${input}&states=${states}`;
    } else if (input !== "") {
      searchURL += `name=${input}`;
    } else if (states.length > 0) {
      searchURL += `states=${states}`;
    } 

    window.location.replace(searchURL);
  });

});
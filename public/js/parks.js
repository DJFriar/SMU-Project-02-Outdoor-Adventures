/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  console.log("parks script ran");

  $(".search-form").submit(function (event) {
    event.preventDefault();
    var searchURL = "/parks/search?";
    var searchArr = [];
    var states = [];
    var designations = [];
    var input = $(".search-input").val();

    $(".state-input").each(function () {
      if ($(this).is(":checked")) {
        states.push($(this).val());
      }
    });

    $(".des-input").each(function () {
      if ($(this).is(":checked")) {
        designations.push($(this).val());
      }
    });

    console.log(designations);

    if (input !== "") {
      searchArr.push(`name=${input}`);
    }

    if (states.length > 0) {
      searchArr.push(`states=${states}`);
    }

    if (designations.length > 0) {
      searchArr.push(`des=${designations}`);
    }

    if (searchArr.length === 1) {
      searchURL += `${searchArr[0]}`;
    } else if (searchArr.length > 1) {
      searchArr.forEach(function(search, index) {
        if (index === 0) {
          searchURL += search;
        } else {
          searchURL += `&${search}`;
        }
      });
    }

    console.log(searchArr);
    console.log(searchURL);
    
    window.location.replace(searchURL);
  });

});
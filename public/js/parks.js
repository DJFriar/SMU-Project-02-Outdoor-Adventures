/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  // Handle Wishlist Button
  $(".btnAddWishlist").on("click", function(event) {
    var id = $(this).data("id");
    var newPark = {
      parkid: id
    };

    $.ajax("/api/addWishlistPark/" + id, {
      type: "PUT",
      data: newPark
    }).then(
      function() {
        console.log(id + " was added to wishlist.");
      }
    );
  });

  // Handle Visited Button
  $(".btnAddVisited").on("click", function(event) {
    console.log("Add Wishlist Clicked");
    var id = $(this).data("id");
    console.log("Selected Park was: " + id);
    var newPark = {
      parkid: id
    };

    $.ajax("/api/addVisitedPark/" + id, {
      type: "PUT",
      data: newPark
    }).then(
      function() {
        console.log(id + " was added to visited.");
      }
    );
  });

  // Search related function
  if (localStorage.getItem("parkName")) {
    var parkName = localStorage.getItem("parkName");
    $(".search-input").val(parkName);
  }
  if (localStorage.getItem("statesFilters")) {
    var stateFilters = localStorage.getItem("statesFilters").split(",");
    stateFilters.forEach(function(state) {
      $(`#${state}`).prop("checked", true);
    });
  }

  if (localStorage.getItem("designationFilters")) {
    var designationFilters = localStorage.getItem("designationFilters").split(",");
    var desInputTarget = "";
    var specialCharacter = /%26/;
    designationFilters.forEach(function(designation) {
      console.log(specialCharacter.test(designation));
      if (specialCharacter.test(designation)) {
        designation = designation.replace(specialCharacter, "and");
      }
      desInputTarget = `#${designation.split(" ").join("-")}-input`;
      console.log(desInputTarget);
      $(desInputTarget).prop("checked", true);
    });
    console.log(designationFilters);
  }

  console.log("parks script ran");
  $(".search-form").submit(handleSubmit);
});

function handleSubmit(event) {
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

  if (input !== "") searchArr.push(`name=${input}`); 
  if (states.length > 0) searchArr.push(`states=${states}`);
  if (designations.length > 0) searchArr.push(`des=${designations}`);

  if (searchArr.length === 1) searchURL += `${searchArr[0]}`;
  else if (searchArr.length > 1) {
    searchArr.forEach(function(search, index) {
      searchURL += (index === 0) ? search : `&${search}`;
    });
  }

  localStorage.setItem("parkName", input);
  localStorage.setItem("statesFilters", states);
  localStorage.setItem("designationFilters", designations);
  window.location.replace(searchURL);
}
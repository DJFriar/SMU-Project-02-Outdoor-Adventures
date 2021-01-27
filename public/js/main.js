/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
$(document).ready(() => {
  // Handle Wishlist Button
  $(".parkJump").on("click", function(event) {
    event.preventDefault();
    var input = $(".parkJumpInput").val();
    console.log(input);
    window.location.href = "/parks/"+input;
  });
});
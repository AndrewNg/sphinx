$(document).ready( function() {
  isPasswordField();
});

// If they login, ask them if they want to have their face remember it

// If they have visited before, log them in. First, take a picture.
// Send it to the album. Check success callback.
function logIn() {

}

// Check if the page is valid
function isPasswordField() {
  var inputs = document.getElementsByTagName("input");
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      console.log("true");
      return true;
    }
  }

  console.log("false");
  return false;
}

// Check if the page is saved
// If they login, ask them if they want to have their face remember it

// If they have visited before, log them in
function logIn() {

}

// Check if the page is valid
function isPasswordField() {
  var inputs = document.getElementsByTagName("input");
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      return false;
    }
  }

  return true;
}

// Check if the page is saved
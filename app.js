var loginMap = {};
var loginAttemptCounter = 0;

$(document).ready( function() {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      window.alert("test");
      window.alert(token);
  logIn();
});

// If they login, ask them if they want to have their face remembered
// Map the keys (urls) to values (boolean)
// function wantRemembered() {
//   if (isPasswordField()) {
//     if (confirm("Do you want to save your login with facial recognition from now on?")) {
//       loginMap[document.URL.toString()] = true;
//     }
//     else {
//       loginMap[document.URL.toString()] = false;
//     }
//   }
// }

// If they have visited before and they chill, log them in. First, take
// a picture. Send it to the album. Check success callback.
function logIn() {
  //test works for twitter
  // if (loginMap[document.URL.toString()] === true) {
  //   // log that shit in
  // }
  if(isPasswordField() && loginAttemptCounter < 1){
    $(".js-username-field").val("hello");
    $(".js-password-field").val("hello");
    $(".submit").click();
    loginAttemptCounter++;
  }
  else {
    // chill
  }
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
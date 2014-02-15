var loginMap = {};
var loginAttemptCounter = 0;

$(document).ready( function() {
  //chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      //window.alert("test");
      //window.alert(token);
  //});
  file = dataURLtoBlob("https://www.facebook.com/l.php?u=https%3A%2F%2Fscontent-b.xx.fbcdn.net%2Fhphotos-prn2%2Fv%2Ft34%2F1898969_810873618926683_1081074634_n.jpg%3Foh%3Dd8ad8d38b338801d6376c6e69092bd4f%26oe%3D5301ECB2&h=KAQEAz91C");
  window.alert('test3');
  logIn(file);
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

function dataURLtoBlob(dataUrl) {
    // Decode the dataURL    
    var binary = atob(dataUrl.split(',')[1]); // WTF magiks

    // Create 8-bit unsigned array
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    // Return our Blob object
    return new Blob([new Uint8Array(array)], {
        type: 'image/png'
    });
}

function logIn(file) {
  var fd = new FormData();
  // Append our Canvas image file to the form data
  window.alert('gonna ajax soon');
  fd.append("api_key", "w4MNPJTrcCmQorju");
  fd.append("api_secret", "MMJvTTMcjGCte6N2");
  fd.append("jobs", "face_recognize");
  fd.append("name_space", "headlok");
  fd.append("uploaded_file", file); 
  fd.append("user_id", "headlok");    
  $.ajax({
      url: "http://rekognition.com/func/api/",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false
  }).done(function (result) {
        var resultObject = JSON.stringify(result);
        alert(resultObject);
  });

  //test works for twitter
  // if (loginMap[document.URL.toString()] === true) {
  //   // log that shit in
  // }
  if(isPasswordField() && loginAttemptCounter < 1){
    $(".js-username-field").val("chesscademy");
    $(".js-password-field").val("ibet1000leaves");
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
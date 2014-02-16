var count = 0;
var HeadLok; 
var user; 


$(document).ready(function () {
    User = Parse.Object.extend("User");
    user = new User();

    var file = null;
    $('#photo').photobooth().on("image", function (event, dataUrl) {
        file = dataURLtoBlob(dataUrl);
        var size = file.size;
        console.log(dataUrl);
        console.log(file);
        //alert("Picture size: " + size);
        uploadImage(file);
        $("#gallery").append('<img src="' + dataUrl + '" >');
    });
});

$(function() {
      var coords = $('.photobooth.T').faceDetection();
      console.log(coords);    
  });

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

function uploadImage(file) {
    var fd = new FormData();
    // Append our Canvas image file to the form data
    fd.append("api_key", "w4MNPJTrcCmQorju");
    fd.append("api_secret", "MMJvTTMcjGCte6N2");
    fd.append("jobs", "face_add");
    fd.append("name_space", "headlok");
    fd.append("user_id", "headlok");
    fd.append("uploaded_file", file); 
    fd.append("tag", $("#email").val()); 


    user.set("score", 1337);
     
    gameScore.save(null, {
      success: function(user) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + user.id);
      },
      error: function(user, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
         console.log('Failed to create new object, with error code: ' + error.description);
      }
    });

    // And send it
    $.ajax({
        url: "http://rekognition.com/func/api/",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false
    }).done(function (result) {
        var resultObject = JSON.stringify(result);
        //alert(resultObject);
        if (count >= 2) {
        	$('#photo').empty();
        	var fd = new FormData();
			    // Append our Canvas image file to the form data
			    fd.append("api_key", "w4MNPJTrcCmQorju");
			    fd.append("api_secret", "MMJvTTMcjGCte6N2");
			    fd.append("jobs", "face_train");
			    fd.append("name_space", "headlok");
			    fd.append("user_id", "headlok");  	
        	$.ajax({
			        url: "http://rekognition.com/func/api/",
			        type: "POST",
			        data: fd,
			        processData: false,
			        contentType: false
			    })
        }
        count++;
    });
}
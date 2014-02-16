var count = 0;

$(document).ready(function () {
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
    localStorage.setItem("email", $("#email").val());
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
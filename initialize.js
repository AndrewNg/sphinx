var count = 0;
var email; 

$(document).ready(function () {
    if (localStorage.getItem("email")) {
        $('#logged_in_as').text("Logged in as " + localStorage.getItem("email"));
    }
    var file = null;
    $('#photo').photobooth().on("image", function (event, dataUrl) {
        file = dataURLtoBlob(dataUrl);
        var size = file.size;
        console.log(dataUrl);
        console.log(file);
        //alert("Picture size: " + size);
        uploadImage(file);
        $("#gallery").append('<img src="' + dataUrl + '" + style="margin: 10px 3%">');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_email');

    link.addEventListener('click', function() {
       localStorage.setItem("email", $("#email").val());
       email = $("#email").val();
       $('#logged_in_as').text("Logged in as " + email);
       alert('Successfully updated email!');
       console.log('email updated');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_credentials');

    link.addEventListener('click', function() {
        localStorage.setItem(email + $("#url-field").val() + "_username", $("#username-field").val());
        localStorage.setItem(email + $("#url-field").val() + "_password", $("#password-field").val());
        alert('Successfully updated credentials!');
        console.log('credentials updated');
    });
});

function submit_email() {
    alert('email');
}

function submit_credentials() {
    alert('credentials');
}

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
    fd.append("user_id", "headlok1");
    fd.append("uploaded_file", file); 
    fd.append("tag", $("#email").val()); 
    localStorage.setItem("email", email);
    console.log(email);
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
			    fd.append("user_id", "headlok1");
        	$.ajax({
			        url: "http://rekognition.com/func/api/",
			        type: "POST",
			        data: fd,
			        processData: false,
			        contentType: false
			    })
        }
        count++;
        console.log(localStorage.getItem("email"));
    });
}
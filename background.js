chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({'url': "initialize.html"});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.type == "snapshot") {
			navigator.webkitGetUserMedia({video: true}, function(stream) {
				document.body.innerHTML += '<video id="v" width="900" height="900"></video>';
				document.body.innerHTML += '<canvas id="c" style="display:none;" width="900" height="900"></canvas>';

				var video = document.getElementById('v');
				var canvas = document.getElementById('c');

				video.src = window.webkitURL.createObjectURL(stream);
				video.play();

				setTimeout(function() {
					canvas.getContext("2d").drawImage(video, 0, 0);
					var img = canvas.toDataURL("image/png");
					console.log(img);
					sendResponse({image: img});
				},200);
			}, function(err) { alert("there was an error " + err)});
		}
		else if (request.type == "email_update") {
			console.log(localStorage.getItem("email"));
			var email = localStorage.getItem("email");
			console.log(email);
			console.log(request.url);
			sendResponse({email: email, username: localStorage.getItem(email + request.url + "_username"), password: localStorage.getItem(email + request.url + "_password")});
		}
		return true;
	});

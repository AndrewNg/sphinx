chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': "initialize.html"});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("message received");
		if (request.greeting == "snapshot") {
			navigator.webkitGetUserMedia({video: true}, function(stream) {
				document.body.innerHTML += '<video id="v" width="300" height="300"></video>';
				document.body.innerHTML += '<canvas id="c" style="display:none;" width="300" height="300"></canvas>';

				var video = document.getElementById('v');
				var canvas = document.getElementById('c');

				video.src = stream;
				canvas.getContext("2d").drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
				var img = canvas.toDataURL("image/png");
				console.log(img);
				sendResponse({farewell: "test"});
			}, function(err) { alert("there was an error " + err)});
		}
});


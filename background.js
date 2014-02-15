chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': "initialize.html"});
});

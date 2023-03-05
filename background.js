// Listen for the extension button to be clicked
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the content script to initiate the search
  chrome.tabs.sendMessage(tab.id, {action: "search"});
});

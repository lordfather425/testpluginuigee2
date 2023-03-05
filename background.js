// Listen for a click on the browser action icon
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the content script to extract the year, make, and model from the Facebook Marketplace listing
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "extract_data"}, function(response) {
      // Send a message to the content script to search CarGurus.com for the extracted data
      chrome.tabs.sendMessage(tabs[0].id, {action: "search_cargurus", data: response}, function(response) {
        // Display the average listing price in a pop-up window
        chrome.tabs.create({url: chrome.runtime.getURL('popup.html'), active: true}, function(tab) {
          chrome.runtime.sendMessage({action: "display_price", data: response});
        });
      });
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "search") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      // Extract year, make, and model from Facebook Marketplace
      // Use extracted data to search CarGurus.com and extract average price
      // Send result back to content script
      sendResponse({price: averagePrice});
    });
  }
  return true;
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "search") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      // Extract year, make, and model from Facebook Marketplace
      // Use extracted data to search CarGurus.com and extract average price
      // Send result back to content script
      sendResponse({price: averagePrice});
    });
  }
  return true;
});

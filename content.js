chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "search") {
    const vehicleInfo = {
      year: "",
      make: "",
      model: ""
    };

    // get year, make, and model from Facebook Marketplace listing
    const listingTitle = document.querySelector("h1._3yjI").textContent;
    const vehicleInfoMatches = listingTitle.match(/(\d{4})\s+(.*)\s+(.*)/);
    if (vehicleInfoMatches) {
      vehicleInfo.year = vehicleInfoMatches[1];
      vehicleInfo.make = vehicleInfoMatches[2];
      vehicleInfo.model = vehicleInfoMatches[3];
    }

    // send year, make, and model to background script to get average price from CarGurus
    chrome.runtime.sendMessage({ action: "getAveragePrice", data: vehicleInfo }, function(response) {
      if (response.error) {
        console.error(response.error);
      } else {
        console.log(response.averagePrice); // for debugging
        sendResponse({ averagePrice: response.averagePrice });
      }
    });

    return true; // needed to make the message passing async
  }
});

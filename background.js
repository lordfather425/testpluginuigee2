chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {action: "search"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getAveragePrice") {
    const { year, make, model } = request.data;
    const url = `https://www.cargurus.com/Cars/instantMarketValueFromVIN.action?startUrl=%2F&carDescription.year=${year}&carDescription.makeName=${make}&carDescription.modelName=${model}&mileage=0&engine=0&transmission=0&driveWheelConfiguration=0&options=0&selectedEntity=d2525`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const averagePrice = data.averagePrice;
        sendResponse({ averagePrice });
      })
      .catch(error => {
        console.error(error);
        sendResponse({ error });
      });

    return true; // needed to make the message passing async
  }
});

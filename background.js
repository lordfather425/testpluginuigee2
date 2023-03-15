chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: "https://www.cargurus.com/Cars/instantMarketValueFromVIN.action",
    type: "popup",
    width: 1200,
    height: 550
  });
});

chrome.proxy.settings.set({
  value: {
    mode: "system"
  },
  scope: "regular"
}, function() {
  console.log("Proxy settings removed, using system settings");
  var iframe = document.getElementById("cargurus-iframe");
  iframe.src = "https://www.cargurus.com/Cars/instantMarketValueFromVIN.action";
});

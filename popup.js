chrome.proxy.settings.set({
  value: {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: "zproxy.lum-superproxy.io",
        port: 22225,
        username: "brd-customer-hl_6d4b7507-zone-static-ip-181.214.40.77",
        password: "gek8nwpwgkl8"
      }
    }
  },
  scope: "regular"
}, function() {
  console.log("Proxy server configured");
  var iframe = document.getElementById("cargurus-iframe");
  iframe.src = "https://www.cargurus.com/Cars/instantMarketValueFromVIN.action";
});

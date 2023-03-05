document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "search" }, function(response) {
      if (response.averagePrice) {
        document.getElementById("averagePrice").textContent = "$" + response.averagePrice.toFixed(2);
      } else {
        document.getElementById("averagePrice").textContent = "N/A";
      }
    });
  });
});

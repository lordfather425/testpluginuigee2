chrome.runtime.sendMessage({action: "search"}, function(response) {
  var price = response.price;
  // Display price in pop-up window
  alert("The average listing price is $" + price);
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // If the message is to initiate the search
  if (request.action === "search") {
    // Extract the year, make, and model of the vehicle listing on Facebook Marketplace
    const title = document.querySelector('h1 span').innerText;
    const [year, make, model] = title.split(' ');

    // Construct the search URL for CarGurus.com
    const searchUrl = `https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?sourceContext=untrackedExternal_generic&newSearchFromOverviewPage=true&inventorySearchWidgetType=AUTO&entitySelectingHelper.selectedEntity=d675&entitySelectingHelper.selectedEntity2=&zip=21044&distance=50&searchChanged=true&modelChanged=false&filtersModified=true&sortType=PRICE&sortDirection=ASC&pageNumber=1&minPrice=0&maxPrice=30000&minMileage=0&maxMileage=200000&selectedTransmissions=&selectedTrimList=${model}&selectedYear=${year}&selectedMakeName=${make}&originSiteId=&analyticsTrackingGroup=&_pageName=HomePage&action=inFrame`;
    
    // Make an HTTP request to CarGurus.com
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the average listing price from the search results
        const { listings } = data;
        const prices = listings.map(listing => listing.price);
        const averagePrice = prices.reduce((acc, curr) => acc + curr) / prices.length;

        // Display the average listing price in a pop-up window
        alert(`The average listing price for a ${year} ${make} ${model} on CarGurus.com is $${averagePrice.toFixed(2)}`);
      });
  }
});

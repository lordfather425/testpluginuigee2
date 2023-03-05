// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "search") {
    // Retrieve the year, make, and model from the Facebook Marketplace listing
    let listingTitle = document.querySelector("._5xhp");
    if (listingTitle) {
      let titleText = listingTitle.innerText.trim().toLowerCase();
      let year = "";
      let make = "";
      let model = "";
      let matches = titleText.match(/\d{4}\s+(.*?)\s+(.*)/);
      if (matches) {
        year = matches[1];
        let makeModelMatches = matches[2].match(/^(.*?)\s+(.*)/);
        if (makeModelMatches) {
          make = makeModelMatches[1];
          model = makeModelMatches[2];
        }
      }
      if (year && make && model) {
        // Use the retrieved year, make, and model to search for the same car on Cargurus
        let searchQuery = make + "+" + model + "+" + year;
        let searchUrl = "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&newSearchFromOverviewPage=true&inventorySearchWidgetType=AUTO&entitySelectingHelper.selectedEntity=d31&entitySelectingHelper.selectedEntity2=&zip=ZIP_CODE&distance=MILES&searchChanged=true&modelChanged=false&filtersModified=true&sortType=undefined&sortDirection=undefined#resultsPage=1&showNegotiable=true";
        searchUrl = searchUrl.replace("ZIP_CODE", request.zipcode).replace(/MAKE_MODEL_YEAR/g, searchQuery);
        fetch(searchUrl)
          .then(response => response.text())
          .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let listings = doc.querySelectorAll(".srp-list-item");
            let totalPrice = 0;
            let numListings = 0;
            for (let i = 0; i < listings.length; i++) {
              let listing = listings[i];
              let listingTitle = listing.querySelector(".listing-title");
              let listingPrice = listing.querySelector(".cg-dealFinder-priceAnalysis-priceValue");
              if (listingTitle && listingPrice) {
                let titleText = listingTitle.innerText.trim().toLowerCase();
                let priceText = listingPrice.innerText.trim().replace(/\D+/g, "");
                if (titleText.includes(make.toLowerCase()) && titleText.includes(model.toLowerCase()) && titleText.includes(year) &&

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "scrapePage") {
      scrapeInstagramPage();
    }
  }
);

function scrapeInstagramPage() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "scrapePage"});
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "storeData") {
      storeScrapedData(request.data);
    }
  }
);

function storeScrapedData(data) {
  chrome.storage.sync.set({ 'title': data.title, 'description': data.description }, function() {
    console.log('Data is stored in Chrome storage');
  });
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scrapeButton').addEventListener('click', initiateScrape);
    displayScrapedData();
});

function displayScrapedData() {
    chrome.storage.local.get(['title', 'description'], function(result) {
        document.getElementById('scrapedTitle').textContent = result.title;
        document.getElementById('scrapedDescription').textContent = result.description;
    });
}

function initiateScrape() {
    chrome.runtime.sendMessage({message: 'scrapePage'}, function(response) {
        if (response.message === 'storeData') {
            displayScrapedData();
        }
    });
}
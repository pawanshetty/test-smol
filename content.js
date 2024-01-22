function scrapeTitle() {
    let title = document.querySelector('title').innerText;
    return title;
}

function scrapeDescription() {
    let metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute('name') === 'description') {
            return metaTags[i].getAttribute('content');
        }
    }
    return '';
}

function sendMessageToBackground(message, data) {
    chrome.runtime.sendMessage({message: message, data: data});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'scrapePage') {
            let title = scrapeTitle();
            let description = scrapeDescription();
            sendMessageToBackground('storeData', {title: title, description: description});
        }
    }
);
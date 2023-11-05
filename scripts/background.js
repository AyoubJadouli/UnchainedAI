console.log('background.js loaded ...');
chrome.webNavigation.onCompleted.addListener(function(details) {
    const url = details.url;
    const matches = [
        "https://bard.google.com/*",
        "https://*.openai.com/*",
        "https://*.bing.com/*",
        "https://you.com/*",
        "https://edgeservices.bing.com/*"
    ];

    for (const match of matches) {
        if (url.includes(match.replace('https://', '').replace('/*', ''))) {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ['scripts/content.js']
            });
            break;
        }
    }
});
document.getElementById('injectScript').addEventListener('click', injectScript);

async function injectScript() {
    console.log("injectScript function called");

    // Get the button element
    var button = document.getElementById('injectScript');
    console.log("Button element:", button);

    // Try to inject the script
    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log("Tab:", tab);

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/content.js']
        });
        console.log("Script injected successfully");

        // If the script was injected successfully, change the button color to green
        button.style.background = 'linear-gradient(to right, green, darkgreen)';

        // Fetch the content of content.js
        let response = await fetch('scripts/content.js');
        let content = await response.text();
        console.log("Content of content.js:", content);

        // Copy the content to the clipboard
        await navigator.clipboard.writeText(content);
        console.log("Content copied to clipboard");
    } catch (error) {
        // If there's an error, change the button color to red
        console.log("Error:", error);
        button.style.background = 'linear-gradient(to right, red, darkred)';
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.bingDetected) {
        // Change the button color to green
        var button = document.getElementById('injectScript');
        button.style.background = 'linear-gradient(to right, green, darkgreen)';
        button.style.border = '4px solid blue';
        console.log("Button color and border updated");
    }
});
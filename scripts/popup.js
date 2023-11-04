document.addEventListener("DOMContentLoaded", function() {
    var toggleScript = document.getElementById("toggleScript");

    // Load the state of the script from storage
    chrome.storage.local.get(["scriptEnabled"], function(result) {
        toggleScript.checked = result.scriptEnabled === true;
    });

    toggleScript.addEventListener("change", function() {
        var scriptEnabled = toggleScript.checked;
        chrome.storage.local.set({ scriptEnabled });

        // Send a message to the content script to enable or disable the script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: function(scriptEnabled) {
                    if (scriptEnabled) {
                        // Start the script
                        updateAttributeInLoop();
                    } else {
                        // Stop the script (you may need to implement this function)
                    }
                },
                args: [scriptEnabled],
            });
        });
    });
});
console.log("Unchainer AI v1.5: script loaded ...");

const MAX_TOCKENS_VALUE = "32768";

// Function to find and update all textarea elements in the DOM
function updateTextareas(node) {
    if (node.tagName === 'TEXTAREA') {
        node.maxLength = MAX_TOCKENS_VALUE;
    }

    if (node.shadowRoot) {
        updateTextareas(node.shadowRoot);
    }

    if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach((child) => {
            updateTextareas(child);
        });
    }
}

// Function to observe DOM changes and update text areas
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        updateTextareas(document.body);
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
}

// Wait 200ms before checking if the word 'bing' is present in the body's innerHTML
setTimeout(() => {
    if (document.body.innerHTML.includes('bing')) {
        // Start observing DOM changes
        console.log("bing detected")
        observeDOMChanges();
    }
}, 200);
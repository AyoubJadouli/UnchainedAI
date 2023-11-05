console.log("Unchainer AI: script loaded ...");

const MAX_TOCKENS_VALUE = "32768";

console.log("Script loaded ...");

// Function to find all textarea elements in the DOM
function findAllTextareas() {
    const textareas = [];

    const findAllTextareasRecursively = (node) => {
        if (node.tagName === 'TEXTAREA') {
            textareas.push(node);
        }

        if (node.shadowRoot) {
            findAllTextareasRecursively(node.shadowRoot);
        }

        if (node.childNodes && node.childNodes.length > 0) {
            node.childNodes.forEach((child) => {
                findAllTextareasRecursively(child);
            });
        }
    };

    findAllTextareasRecursively(document.body);

    // Modify the maxLength attribute of each found textarea element to 32768
    textareas.forEach((textarea) => {
        textarea.maxLength = MAX_TOCKENS_VALUE;
    });

    return textareas;
}

// Function to observe DOM changes and update text areas
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        const allTextareas = findAllTextareas();
        console.log(allTextareas);
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
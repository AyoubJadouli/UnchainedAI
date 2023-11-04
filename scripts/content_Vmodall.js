console.log("Unchainer AI: script loaded ...");

const TARGET_VALUE = "32000";

// Function to find all text areas inside elements, including those inside nested shadow roots, with specific max length attributes
function findAllTextAreasWithMaxLength(node, textAreas, maxLength) {
    if (node.nodeType === Node.TEXT_NODE) {
        textAreas.push({ data: node.data.trim(), maxLength: maxLength });
    }
    if (node.shadowRoot) {
        findAllTextAreasWithMaxLength(node.shadowRoot, textAreas, maxLength);
    }
    if (node.childNodes && node.childNodes.length > 0) {
        Array.from(node.childNodes).forEach((child) => {
            const maxLenAttr = child.getAttribute && child.getAttribute("maxlength");
            if (maxLenAttr === "4000" || maxLenAttr === "2000") {
                child.setAttribute("maxlength", TARGET_VALUE); // Set the maxlength value to 32000
                findAllTextAreasWithMaxLength(child, textAreas, TARGET_VALUE);
            } else {
                findAllTextAreasWithMaxLength(child, textAreas, maxLength);
            }
        });
    }
}

// Function to get all text areas with specific max length attributes
function getAllTextAreasWithMaxLength(maxLength) {
    const allTextAreas = [];
    findAllTextAreasWithMaxLength(document.body, allTextAreas, maxLength);
    return allTextAreas;
}

// Function to observe DOM changes and update text areas
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        const maxLength = ["4000", "2000"];
        const textAreasWithMaxLength = maxLength.map(len => getAllTextAreasWithMaxLength(len)).flat();
        //console.log(textAreasWithMaxLength);
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
}

// Start observing DOM changes
observeDOMChanges();
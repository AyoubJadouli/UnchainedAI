console.log("Unchainer AI: script loaded ...");

const TARGET_VALUE = "32000";
//const SELECTOR = "#b_sydConvCont > cib-serp";
const SELECTOR = "#searchbox";

function updateAttributeInLoop() {
    const observer = new MutationObserver((mutationsList, observer) => {
        const element = document.querySelector(SELECTOR);
        if (element) {
            observer.disconnect(); // Stop observing once the element is available
            waitForElement(element);
        }
    });

    // Start observing changes in the DOM
    observer.observe(document.body, { subtree: true, childList: true });
}

function waitForElement(element) {
    const textarea = element.shadowRoot
        .querySelector("#cib-action-bar-main").shadowRoot
        .querySelector("div > div.main-container > div > div.input-row > cib-text-input").shadowRoot
        .querySelector("#searchboxform > label > textarea");

    if (textarea) {
        const currentValue = textarea.getAttribute("maxlength");
        if (currentValue !== TARGET_VALUE) {
            textarea.setAttribute("maxlength", TARGET_VALUE);
            console.log(`Changed attribute from ${currentValue} to ${TARGET_VALUE}`);
        } else {
            console.log(`Attribute is already set to ${TARGET_VALUE}`);
        }

        // Set a timeout to wait for 200ms and then repeat the process
        setTimeout(updateAttributeInLoop, 200);
    } else {
        setTimeout(() => waitForElement(element), 100);
    }
}

// Start the loop
updateAttributeInLoop();
updateAttributeInLoop();
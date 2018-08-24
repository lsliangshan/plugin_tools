document.querySelector('#test').onclick = function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // chrome.tabs.executeScript(tabs[0].id, {code: 'document.body.style.backgroundColor="red";'});
    // chrome.tabs.executeScript(tabs[0].id, {file: 'js/popup_background.js'});
    // chrome.tabs.create({url: chrome.extension.getURL('src/dist/index.html')});
    chrome.tabs.create({url: chrome.extension.getURL('html/index.html')});
  });
}

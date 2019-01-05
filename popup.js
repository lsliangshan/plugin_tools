chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	/**
	 * {"active":true,"audible":false,"autoDiscardable":true,"discarded":false,"height":563,"highlighted":true,"id":1147411360,"incognito":false,"index":11,"mutedInfo":{"muted":false},"pinned":false,"selected":true,"status":"complete","title":"Rax App","url":"file:///Keith/git/ls/workspace_anime/anime01/index.html","width":1558,"windowId":1147410923}
	 */
  // alert(tabs[0].title + ', ' + tabs[0].url)
  // chrome.tabs.create({url: chrome.extension.getURL('html/index.html')});
  document.querySelector('.qrocde_title').innerHTML = tabs[0].title
});

document.querySelector('#test').onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // chrome.tabs.executeScript(tabs[0].id, {code: 'document.body.style.backgroundColor="red";'});
    // chrome.tabs.executeScript(tabs[0].id, {file: 'js/popup_background.js'});
    // chrome.tabs.create({url: chrome.extension.getURL('src/dist/index.html')});
    chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
  });
}

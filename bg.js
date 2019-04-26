const puppeteer = require('puppeteer')

let notification = null

function show (args) {
  notification = new Notification(args ? (args.content || '提示内容') : '提示内容', {
    icon: 'logo-48.png'
  })
  if (args.click && (typeof args.click === 'function')) {
    notification.onclick = args.click
  }
}

function getFulllScreenShot (info, tab) {
  show({
    click (evt) {
      alert(JSON.stringify(evt))
    }
  })
}

function genericOnClick (info, tab) {
  /**
  tab: {
    "active": true,
    "audible": false,
    "autoDiscardable": true,
    "discarded": false,
    "favIconUrl": "https://developer.chrome.com/favicon.ico",
    "height": 978,
    "highlighted": true,
    "id": 2502,
    "incognito": false,
    "index": 13,
    "mutedInfo": {
      "muted": false
    },
    "openerTabId": 2242,
    "pinned": false,
    "selected": true,
    "status": "complete",
    "title": "https://developer.chrome.com/extensions/examples/api/contextMenus/basic/sample.js",
    "url": "https://developer.chrome.com/extensions/examples/api/contextMenus/basic/sample.js",
    "width": 1070,
    "windowId": 1983
  }
   */
  /**
   info: {
    "editable": false,
    "frameId": 0,
    "menuItemId": 1438,
    "pageUrl": "https://developer.chrome.com/extensions/examples/api/contextMenus/basic/sample.js",
    "parentMenuItemId": 1437,
    "selectionText": "csss"
  }
   */
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info, null, 2));
  console.log("tab: " + JSON.stringify(tab, null, 2));
}

let contextMenu = null
let selectionContextMenu = null
if (!selectionContextMenu) {
  selectionContextMenu = chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Enkel Loves You'
  })
  chrome.contextMenus.create({
    contexts: ['selection'],
    title: '网页全屏截图: %s',
    parentId: selectionContextMenu,
    onclick: genericOnClick
  })
  chrome.contextMenus.create({
    contexts: ['selection'],
    type: 'separator',
    parentId: selectionContextMenu
  })
  chrome.contextMenus.create({
    contexts: ['selection'],
    title: '自动生成密码',
    parentId: selectionContextMenu,
    onclick: genericOnClick
  })
}

if (!contextMenu) {
  contextMenu = chrome.contextMenus.create({
    title: 'Enkel Loves You'
  })
  chrome.contextMenus.create({
    title: '网页全屏截图',
    parentId: contextMenu,
    onclick: genericOnClick
  })
  chrome.contextMenus.create({
    type: 'separator',
    parentId: contextMenu
  })
  chrome.contextMenus.create({
    title: '自动生成密码',
    parentId: contextMenu,
    onclick: genericOnClick
  })
}

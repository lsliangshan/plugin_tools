<script>
// import puppeteer from 'puppeteer'
export default {
  name: 'ContextMenu',
  data () {
    return {
      contextMenu: null,
      selectionContextMenu: null,
      browser: null,
      page: null,
      notification: null
    }
  },
  mounted () {
    this.initContextMenu()
    // chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    //   if (request.action === 'context-menu') {
    //     console.log('request: ', request)
    //     sendResponse(request)
    //   }
    // })
  },
  methods: {
    showNotification (args) {
      this.notification = new Notification(args ? (args.content || '提示内容') : '提示内容', {
        icon: 'logo-48.png'
      })
      if (args.click && (typeof args.click === 'function')) {
        this.notification.onclick = args.click
      }
    },
    async initPuppeteer () {
      if (!this.browser) {
        this.browser = await (puppeteer.launch({
          timeout: 10000,
          ignoreHTTPSErrors: true,
          headless: true
        }))
        this.page = await this.browser.newPage()
      }
    },
    genericOnClick (info, tab) {
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
    },
    initContextMenu () {
      if (!this.selectionContextMenu) {
        this.selectionContextMenu = chrome.contextMenus.create({
          contexts: ['selection'],
          title: 'Enkel Loves You'
        })
        chrome.contextMenus.create({
          contexts: ['selection'],
          title: '网页全屏截图: %s',
          parentId: this.selectionContextMenu,
          onclick: this.genericOnClick
        })
        chrome.contextMenus.create({
          contexts: ['selection'],
          type: 'separator',
          parentId: this.selectionContextMenu
        })
        chrome.contextMenus.create({
          contexts: ['selection'],
          title: '自动生成密码',
          parentId: this.selectionContextMenu,
          onclick: this.genericOnClick
        })
      }

      if (!this.contextMenu) {
        this.contextMenu = chrome.contextMenus.create({
          title: 'Enkel Loves You'
        })
        chrome.contextMenus.create({
          title: '网页全屏截图',
          parentId: this.contextMenu,
          onclick: this.genericOnClick
        })
        chrome.contextMenus.create({
          type: 'separator',
          parentId: this.contextMenu
        })
        chrome.contextMenus.create({
          title: '自动生成密码',
          parentId: this.contextMenu,
          onclick: this.genericOnClick
        })
      }
      // return new Promise(resolve => {
      //   chrome.contextMenus.removeAll(() => {
      //     this.contextMenu = chrome.contextMenus.create({
      //       title: 'Enkel Loves You'
      //     })
      //     chrome.contextMenus.create({
      //       title: '网页全屏截图',
      //       parentId: this.contextMenu,
      //       onclick: this.getFulllScreenShot
      //     })
      //     resolve(true)
      //   })
      // })
    },
    getFulllScreenShot (e) {
      this.showNotification()
    }
  }
}
</script>

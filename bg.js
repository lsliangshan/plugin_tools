// import CodeRoutes from './src/router/code-routes.js'
// import ConvenienceRoutes from './src/router/convenience-routes.js'
const CodeRoutes = {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '常用工具'
  },
  children: [{
    path: '/json',
    name: 'json',
    meta: {
      label: 'JSON',
      title: 'JSON格式化',
      icon: '#route-json',
      name: 'JSON格式化',
      desc: '可以对JSON代码进行格式化和美化',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Json.vue')
    }
  }, {
    path: '/qrcode',
    name: 'qrcode',
    meta: {
      label: '二维码',
      title: '二维码生成',
      icon: '#route-qrcode',
      name: '二维码生成',
      desc: '将字符生成二维码，可下载生成的二维码',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Qrcode.vue')
    }
  }, {
    path: '/base64',
    name: 'base64',
    meta: {
      label: 'BASE64',
      title: 'base64转换',
      icon: '#route-base64',
      name: 'base64编码解码',
      desc: '字符与base64互转，图片与base64互转',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Base64.vue')
    }
  }, {
    path: '/url',
    name: 'url',
    meta: {
      label: 'URL',
      title: 'URL参数解析',
      icon: '#route-url',
      name: 'URL参数解析',
      desc: 'URL参数转JSON，JSON转URL参数格式',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Url.vue')
    }
  }, {
    path: '/scripts',
    name: 'scripts',
    meta: {
      label: '网页脚本注入',
      title: '网页脚本注入',
      icon: '#route-scripts',
      name: '网页脚本注入',
      desc: '允许用户向目标网页注入脚本',
      createTime: '1555234941000',
      hot: true
    },
    components: {
      ContentRouter: () => import('../components/tool/Scripts.vue')
    }
  }, {
    path: '/time',
    name: 'time',
    meta: {
      label: '时间戳',
      title: '时间戳转换',
      icon: '#route-time',
      name: '时间戳转换',
      desc: '时间戳与北京时间互转，获取时间戳',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Time.vue')
    }
  }, {
    path: '/diff',
    name: 'diff',
    meta: {
      label: '文件对比',
      title: '文件对比',
      icon: '#route-diff',
      name: '文件对比',
      desc: '在线检测/比较两个文件或文本的不同',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () => import('../components/tool/Diff.vue')
    }
  }, {
    path: '/code',
    name: 'code',
    meta: {
      label: 'CHAR',
      title: 'html实体代码',
      icon: '#route-code',
      name: 'html实体代码',
      desc: 'html实体代码查询',
      createTime: '545440088000',
      hot: false
    },
    components: {
      ContentRouter: () =>
        import('../components/tool/Code.vue')
    }
  }]
}
const ConvenienceRoutes = {
  meta: {
    label: 'Home',
    title: 'Enkel Tools',
    name: '其它工具'
  },
  children: [
    {
      path: '/augury',
      name: 'augury',
      meta: {
        label: '程序员求签',
        title: '程序员求签',
        icon: '#route-augury',
        name: '程序员求签',
        desc: '不求生老病死，只求程序无BUG，产品无需求，UI无变更',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Augury.vue')
      }
    },
    {
      path: '/pinyin',
      name: 'pinyin',
      meta: {
        label: '汉字转拼音、五笔',
        title: '汉字转拼音、五笔',
        icon: '#route-pinyin',
        name: '汉字转拼音、五笔',
        desc: '将汉字转成五笔或拼音（拼音可带音调）',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () =>
          import('../components/tool/Pinyin.vue')
      }
    },
    {
      path: '/morse',
      name: 'morse',
      meta: {
        label: '摩斯电码',
        title: '摩斯电码',
        icon: '#route-morse',
        name: '摩斯电码',
        desc: '摩斯电码编码解码',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Morse.vue')
      }
    },
    {
      path: '/id-photo',
      name: 'id',
      meta: {
        label: '证件照',
        title: '证件照',
        icon: '#route-id',
        name: '证件照',
        desc: '免费获取各种尺寸、背景色证件照',
        createTime: '1555234941000',
        hot: true
      },
      components: {
        ContentRouter: () => import('../components/tool/Id.vue')
      }
    },
    {
      path: '/img',
      name: 'img',
      meta: {
        label: '传图识色',
        title: '传图识色',
        icon: '#route-img',
        name: '传图识色',
        desc: '可识别图片的主色调及辅色',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () =>
          import('../components/tool/Image.vue')
      }
    }, {
      path: '/steganography',
      name: 'steganography',
      meta: {
        label: '图片隐写术',
        title: '图片隐写术',
        icon: '#route-steganography',
        name: '图片隐写术',
        desc: '图片隐写术，内向同学的告白神器',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Steganography.vue')
      }
    },
    {
      path: '/ip',
      name: 'ip',
      meta: {
        label: 'IP',
        title: 'ip地址查询',
        icon: '#route-ip',
        name: 'ip地址查询',
        desc: '查询IP或域名的地理位置、宽带供应商；查看我的IP',
        createTime: '1555234941000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Ip.vue')
      }
    }, {
      path: '/crypto',
      name: 'crypto',
      meta: {
        label: '文字加密解密',
        title: '文字加密解密',
        icon: '#route-crypto',
        name: '文字加密解密',
        desc: '支持MD5、AES、DES、RC4、Rabbit等多种加密算法',
        createTime: '545440088000',
        hot: false
      },
      components: {
        ContentRouter: () => import('../components/tool/Crypto.vue')
      }
    }
    // ,
    // {
    //   path: '/conference',
    //   name: 'conference',
    //   meta: {
    //     label: '视频通话',
    //     title: '视频通话',
    //     icon: '#route-conference',
    //     name: '视频通话',
    //     desc: '免费视频通话',
    //     createTime: '1555234941000',
    //     hot: true
    //   },
    //   components: {
    //     ContentRouter: () => import('../components/tool/Conference.vue')
    //   }
    // }
  ]
}

function getTools (routes) {
  let outObj = {}
  if (routes.hasOwnProperty('meta') && routes.meta.name) {
    outObj.name = routes.meta.name
  } else {
    outObj.name = routes.name || '工具集'
  }
  outObj.sublist = []
  for (let i = 0; i < routes.children.length; i++) {
    let tempObj = {}
    if (routes.children[i].hasOwnProperty('name')) {
      tempObj.pathName = routes.children[i].name
      tempObj.path = routes.children[i].path
    }
    tempObj = Object.assign({}, tempObj, routes.children[i].meta)
    outObj.sublist.push(tempObj)
  }
  return outObj
}

function getAllTools () {
  let outPath = []
  outPath.push(getTools(CodeRoutes))
  outPath.push(getTools(ConvenienceRoutes))
  return outPath
}

const AllTools = getAllTools()

let notification = null

function show (args) {
  notification = new Notification(args ? (args.content || '提示内容') : '提示内容', {
    icon: 'logo-48.png'
  })
  if (args.click && (typeof args.click === 'function')) {
    notification.onclick = args.click
  }
}

function goToExtensionRoute (route) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html/#' + route) });
  });
}
function goToExtensionRouteWithQuery (info, tab, route) {
  let q = ''
  if (info.mediaType === 'image') {
    q = info.srcUrl
  } else {
    q = info.selectionText
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html/#' + route + '?q=' + q) });
  });
}

let contextMenu = null
let selectionContextMenu = null
let contexts = ['selection', 'image']
if (!selectionContextMenu) {
  selectionContextMenu = chrome.contextMenus.create({
    contexts: contexts,
    title: 'Enkel Loves You'
  })
  for (let i = 0; i < AllTools.length; i++) {
    if (i !== 0) {
      chrome.contextMenus.create({
        contexts: contexts,
        type: 'separator',
        parentId: selectionContextMenu
      })
    }
    let subMenu = chrome.contextMenus.create({
      contexts: contexts,
      title: AllTools[i].name,
      parentId: selectionContextMenu
    })
    for (let j = 0; j < AllTools[i].sublist.length; j++) {
      chrome.contextMenus.create({
        contexts: contexts,
        title: AllTools[i].sublist[j].title,
        parentId: subMenu,
        onclick (info, tab) {
          goToExtensionRouteWithQuery(info, tab, AllTools[i].sublist[j].path)
        }
      })
    }
  }
}

if (!contextMenu) {
  contextMenu = chrome.contextMenus.create({
    title: 'Enkel Loves You'
  })
  for (let i = 0; i < AllTools.length; i++) {
    if (i !== 0) {
      chrome.contextMenus.create({
        type: 'separator',
        parentId: contextMenu
      })
    }
    let subMenu = chrome.contextMenus.create({
      title: AllTools[i].name,
      parentId: contextMenu
    })
    for (let j = 0; j < AllTools[i].sublist.length; j++) {
      chrome.contextMenus.create({
        title: AllTools[i].sublist[j].title,
        parentId: subMenu,
        onclick () {
          goToExtensionRoute(AllTools[i].sublist[j].path)
        }
      })
    }
  }
}

function formatSuggest (text) {
  let allTools = AllTools
  let outArr = []
  let i = 0
  let j = 0
  for (i; i < allTools.length; i++) {
    for (j; j < allTools[i].sublist.length; j++) {
      if (allTools[i].sublist[j].path.indexOf(text) > -1) {
        outArr.push({
          content: allTools[i].sublist[j].path,
          description: allTools[i].sublist[j].title + ' - ' + allTools[i].sublist[j].desc
        })
      }
    }
  }
  return outArr
}

chrome.omnibox.onInputChanged.addListener(
  function (text, suggest) {
    let s = formatSuggest(text)
    suggest(s)
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function (text) {
    goToExtensionRoute(text)
  });

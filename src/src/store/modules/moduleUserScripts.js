const moduleUserScripts = {
  namespaced: true,
  state: {
    userScripts: [
      {
        "match": "*",
        "desc": "工具-快捷版",
        "author": "Enkel",
        "scripts": "/**\n* @author\tEnkel\n* @match\t*\n* @desc \t工具-快捷版\n*/\n(function () {\n\t// 输入代码...\n  var OPENED = false\n  \n  var boxStyleText = `\n#enkel_box {\n    position: fixed;\n\tbottom: 100px;\n\tleft: 15px;\n\twidth: 200px;\n\theight: 32px;\n\tborder-radius: 4px;\n\tpadding: 15px 10px;\n\tbox-sizing: border-box;\n\tbackground-color: #ffffff;\n\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.6);\n\ttransform: translate3d(0, 0, 0);\n\ttransition: all .3s ease-in-out;\n}\n#enkel_box.closed {\n\ttransform: translate3d(-1000px, 0, 0);\n}\n\t`\n  \n  function insertStyle (styleText) {\n  \tvar style = document.createElement(\"style\");\n    style.type = \"text/css\";\n    try {\n      style.appendChild(document.createTextNode(styleText));\n    } catch (ex) {\n      style.styleSheet.cssText = styleText; // 针对IE\n    }\n    var head = document.getElementsByTagName(\"head\")[0];\n    head.appendChild(style);\n  }\n  \n  insertStyle(boxStyleText)\n  \n  function getBox () {\n  \tvar box = document.querySelector('#enkel_box')\n    if (!box) {\n      box = document.createElement('div')\n      box.id = 'enkel_box'\n      document.body.appendChild(box)\n    }\n    var classClose = 'closed'\n    if (OPENED) {\n      // 打开\n      if (box.classList.contains(classClose)) {\n        box.classList.remove(classClose)\n      }\n    } else {\n      // 关闭\n      if (!box.classList.contains(classClose)) {\n        box.classList.add(classClose)\n      }\n    }\n  }\n  \n  function toggleBox () {\n    OPENED = !OPENED\n    getBox()\n  }\n  \n  window.onkeydown = function (ev) {\n    // e: 69\n    if (ev.metaKey && (ev.keyCode === 69)) {\n      toggleBox()\n      // var url = 'chrome-extension://aeielbfakoabgmdhinckokdigiappfhd/index.html#/json'\n      // chrome.tabs.create({ url: url });\n      ev.preventDefault()\n      return false\n    }\n  }\n})()",
        "active": true,
        "official": true
      }
    ]
  },
  actions: {}
}

export default moduleUserScripts
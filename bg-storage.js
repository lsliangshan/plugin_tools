document.addEventListener('DOMContentLoaded', function () {
  function loadCssText (cssText) {
    var style = document.createElement("style");
    try {
      style.appendChild(document.createTextNode(cssText));
    } catch (ex) {
      style.text = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  loadCssText(`
  #enkel-local-storage-box {
    position: fixed;
    z-index: 999999; 
    width: 480px;
    height: 100%; 
    left: -490px; 
    top: 0px; 
    background-color: rgba(255, 255, 255, 0.9); 
    box-shadow: 0 1px 5px rgba(11, 81, 15, 0.8); 
    transition: all .2s ease-in-out;
    -webkit-transition: all .2s ease-in-out;
    -webkit-user-select: none;
    font-family: sans-serif!important;
  }
  #enkel-message-box {
    position: absolute;
    width: auto;
    // height: 32px;
    bottom: 52px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 10px 40px 10px 15px;
    border-radius: 4px;
    background-color: #31b0d5;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 300;
    transition: all .3s ease-in-out;
    -webkit-transition: all .3s ease-in-out;
    opacity: 0;
    pointer-events: none;
    word-break: break-all;
    text-align: justify;
  }
  #enkel-message-box.show {
    opacity: 1;
    pointer-events: auto;
  }
  #enkel-message-box .enkel-message-box-close {
    position: absolute;
    right: 5px;
    font-size: 24px;
    font-weight: 300;
    width: 32px;
    height: 32px;
    line-height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  #enkel-local-storage-box-header {
    width: 100%; 
    height: 48px; 
    background-color: #fff; 
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 
    padding: 0 15px; 
    box-sizing: border-box;
  }
  #enkel-local-storage-box-header .title {
    color: rgba(11, 81, 15, 1);
    font-size: 16px;
    font-weight: 500;
  }
  #enkel-local-storage-box-header .close {
    width: 36px; 
    height: 36px; 
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: flex-end; 
    font-size: 28px; 
    font-weight: 300; 
    cursor: pointer;
    font-family: sans-serif;
  }
  #enkel-local-storage-box-header .close:active {
    opacity: 0.7;
  }
  #enkel-local-storage-box-content {
    width: 100%;
    height: calc(100% - 48px - 48px);
    overflow-y: auto;
    padding: 5px 0;
    box-sizing: border-box;
    background-color: rgba(11, 81, 15, 0.9);
  }
  #enkel-local-storage-box-content.empty {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 300;
    text-shadow: 0 0 5px #000;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item {
    width: 100%;
    height: 32px;
    margin: 5px 0;
    padding: 0 15px;
    box-sizing: border-box;
    color: #ccc;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.9);
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    transition: background-color .2s ease-in-out;
    -webkit-transition: background-color .2s ease-in-out;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item:hover {
    background-color: rgba(11, 81, 15, 0.7);
  }
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-label {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value {
    width: 240px;
    height: 32px;
    padding: 0;
    margin-left: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 3px;
    overflow-x: hidden;
    white-space: nowrap;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value:hover {
    overflow-x: auto;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item:hover .enkel-local-storage-item-delete {
    opacity: 1;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-delete {
    width: 32px;
    height: 32px;
    margin-left: 10px;
    line-height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 24px; 
    font-weight: 300; 
    cursor: pointer;
    opacity: 0;
    transition: opacity .2s ease-in-out;
    -webkit-transition: opacity .2s ease-in-out;
  }
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value::-webkit-scrollbar {width: 2px;height: 2px;}                        
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value::-webkit-scrollbar-track,::-webkit-scrollbar-thumb {border-radius: 999px;border:0px solid transparent;}
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value::-webkit-scrollbar-track {}
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value::-webkit-scrollbar-thumb {min-height: 20px;background-clip: border-box;box-shadow: 0 0 0 5px rgba(255,255,255,.1) inset;}
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value::-webkit-scrollbar-corner {background: transparent;}
  #enkel-local-storage-box-content .enkel-local-storage-item .enkel-local-storage-item-value[contenteditable]:focus {
    outline: none;
    background-color: rgba(11, 81, 15, 0.8);
  }
  #enkel-local-storage-box-footer {
    width: 100%;
    height: 48px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
  }
  #enkel-local-storage-box-footer .enkel-custom-input:focus {
    outline: none;
  }
  #enkel-local-storage-box-footer .enkel-local-storage-add-label {
    width: 150px;
    height: 32px;
    line-height: 32px;
  }
  #enkel-local-storage-box-footer .enkel-local-storage-add-value {
    width: 220px;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
  }
  #enkel-local-storage-box-footer .enkel-local-storage-add-btn {
    padding: 4px 15px;
    border: none;
    background-color: rgba(11, 81, 15, 0.8);
    color: #fff;
    border-radius: 3px;
    transition: all .1s ease-in-out;
    -webkit-transition: all .1s ease-in-out;
    cursor: pointer;
  }
  #enkel-local-storage-box-footer .enkel-local-storage-add-btn:active {
    background-color: rgba(11, 81, 15, 1);
  }
  #enkel-local-storage-box-footer .enkel-local-storage-add-btn:focus {
    outline: none;
  }
  `)

  function getLocalStorageBox () {
    let localStorageBox = document.querySelector('#enkel-local-storage-box')
    if (!localStorageBox) {
      localStorageBox = document.createElement('div')
      localStorageBox.id = 'enkel-local-storage-box'
      initLocalStorageBoxHeader(localStorageBox)
      initLocalStorageBoxContent(localStorageBox)
      initLocalStorageBoxFooter(localStorageBox)
      document.body.appendChild(localStorageBox)
    }
    return localStorageBox
  }

  function showLocalStorageBox (localStorageBox) {
    localStorageBox.style.left = 0
  }
  function hideLocalStorageBox (localStorageBox) {
    localStorageBox.style.left = '-490px'
  }

  function showMessage (msg) {
    console.log(msg)
    let localStorageBox = document.querySelector('#enkel-local-storage-box')
    if (localStorageBox) {
      let messageBox = document.querySelector('#enkel-message-box')
      if (!messageBox) {
        messageBox = document.createElement('div')
        messageBox.id = 'enkel-message-box'

        let messageText = document.createElement('div')
        messageText.innerHTML = msg
        messageBox.appendChild(messageText)

        let messageClose = document.createElement('div')
        messageClose.className = 'enkel-message-box-close'
        messageClose.innerHTML = '&times;'
        messageClose.onclick = function () {
          hideMessage()
        }
        messageBox.appendChild(messageClose)

        localStorageBox.appendChild(messageBox)
      } else {
        messageBox.querySelectorAll('div')[0].innerHTML = msg
      }
      setTimeout(() => {
        if (!messageBox.classList.contains('show')) {
          messageBox.classList.add('show')
          setTimeout(() => {
            hideMessage()
          }, 300000)
        }
      }, 300)
    }
  }

  function hideMessage () {
    let messageBox = document.querySelector('#enkel-message-box')
    if (messageBox.classList.contains('show')) {
      messageBox.classList.remove('show')
    }
  }

  function initLocalStorageBoxHeader (localStorageBox) {
    let localStorageBoxHeader = document.querySelector('#enkel-local-storage-box-header')
    if (!localStorageBoxHeader) {
      localStorageBoxHeader = document.createElement('div')
      localStorageBoxHeader.id = 'enkel-local-storage-box-header'
      let title = document.createElement('div')
      title.className = 'title'
      title.innerText = 'localStorage管理'
      localStorageBoxHeader.appendChild(title)

      let close = document.createElement('div')
      close.className = 'close'
      close.innerHTML = '&times;'
      close.onclick = function () {
        hideLocalStorageBox(localStorageBox)
      }
      localStorageBoxHeader.appendChild(close)
      localStorageBox.appendChild(localStorageBoxHeader)
    }
  }

  let newLocalStorage = {
    name: '',
    value: ''
  }

  function findEleItemByName (name, boxContent) {
    let items = boxContent.querySelectorAll('.enkel-local-storage-item')
    let outElement = null
    for (let i = 0; i < items.length; i++) {
      let tempEle = items[i].querySelector('.enkel-local-storage-item-label')
      if (tempEle.innerText.trim() === name.trim()) {
        outElement = items[i]
        i = items.length
      }
    }
    return outElement
  }

  function modifyItemElem (args) {
    let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    if (localStorageBoxContent) {
      let itemElem = findEleItemByName(args.name, localStorageBoxContent)
      if (itemElem) {
        itemElem.querySelector('.enkel-local-storage-item-value').innerText = args.value
      }
    }
  }

  function deleteItemElem (args) {
    let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    if (localStorageBoxContent) {
      let itemElem = findEleItemByName(args.name, localStorageBoxContent)
      if (itemElem) {
        let deleted = deleteLocalStorageByName(args.name)
        if (deleted) {
          itemElem.parentNode.removeChild(itemElem)
          watchItemLength()
        }
      }
    }
  }

  function watchItemLength () {
    let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    if (localStorageBoxContent) {
      if (Object.keys(localStorage).length === 0) {
        if (!localStorageBoxContent.classList.contains('empty')) {
          localStorageBoxContent.classList.add('empty')
        }
        localStorageBoxContent.innerText = '无localStorage'
      } else {
        if (localStorageBoxContent.classList.contains('empty')) {
          localStorageBoxContent.innerText = localStorageBoxContent.innerText.replace('无localStorage', '')
          localStorageBoxContent.classList.remove('empty')
        }
      }
    }
  }

  function removeAllItemElem () {
    watchItemLength()
    // let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    // if (localStorageBoxContent) {
    //   if (!localStorageBoxContent.classList.contains('empty')) {
    //     localStorageBoxContent.classList.add('empty')
    //   }
    //   localStorageBoxContent.innerText = '无localStorage'
    // }
  }

  function insertLocalStorageItem (args) {
    let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    if (args) {
      watchItemLength()
      if (localStorageBoxContent) {
        localStorageBoxContent.appendChild(initLocalStorageItem(args))
        localStorageBoxContent.scrollTop = 1000000
      }
    } else {
      let added = addLocalStorage(newLocalStorage)
      if (added) {
        watchItemLength()
        if (localStorageBoxContent) {
          localStorageBoxContent.appendChild(initLocalStorageItem(newLocalStorage))
          localStorageBoxContent.scrollTop = 1000000
        }
        newLocalStorage = {
          name: '',
          value: ''
        }
        let labelInput = document.querySelector('.enkel-local-storage-add-label')
        let valueInput = document.querySelector('.enkel-local-storage-add-value')
        labelInput && (labelInput.value = '')
        valueInput && (valueInput.value = '')
      }
    }
  }

  function initLocalStorageBoxFooter (localStorageBox) {
    let localStorageBoxFooter = document.querySelector('#enkel-local-storage-box-footer')
    if (!localStorageBoxFooter) {
      localStorageBoxFooter = document.createElement('div')
      localStorageBoxFooter.id = 'enkel-local-storage-box-footer'

      let labelInput = document.createElement('input')
      labelInput.setAttribute('placeholder', '请输入localStorage名称')
      labelInput.className = 'enkel-local-storage-add-label enkel-custom-input w150'
      labelInput.oninput = function (e) {
        newLocalStorage.name = e.target.value.trim()
      }
      localStorageBoxFooter.appendChild(labelInput)

      let valueInput = document.createElement('input')
      valueInput.setAttribute('placeholder', '请输入localStorage值')
      valueInput.className = 'enkel-local-storage-add-value enkel-custom-input w240'
      valueInput.oninput = function (e) {
        newLocalStorage.value = e.target.value.trim()
      }
      localStorageBoxFooter.appendChild(valueInput)

      let btnAdd = document.createElement('button')
      btnAdd.className = 'enkel-local-storage-add-btn'
      btnAdd.innerText = '新增'
      btnAdd.onclick = function () {
        if (!newLocalStorage.name) {
          showMessage('localStorage名称不能为空')
        } else {
          insertLocalStorageItem()
          // let added = addLocalStorage(newLocalStorage)
          // if (added) {
          //   let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
          //   if (localStorageBoxContent) {
          //     localStorageBoxContent.appendChild(initLocalStorageItem(newLocalStorage))
          //     localStorageBoxContent.scrollTop = 1000000
          //   }
          //   newLocalStorage = {
          //     name: '',
          //     value: ''
          //   }
          //   labelInput.value = ''
          //   valueInput.value = ''
          // }
        }
      }
      localStorageBoxFooter.appendChild(btnAdd)

      localStorageBox.appendChild(localStorageBoxFooter)
    }
  }

  function getLocalStorageByName (name) {
    return localStorage.getItem(name)
  }

  function hasLocalStorage (name) {
    return Object.keys(localStorage).indexOf(name) > -1
  }

  function deleteLocalStorageByName (name) {
    if (name) {
      localStorage.removeItem(name)
    }
    return true
  }

  function addLocalStorage (ls) {
    if (hasLocalStorage(ls.name)) {
      showMessage('localStorage【' + ls.name + '】已经存在')
      return false
    } else {
      localStorage.setItem(ls.name, ls.value)
      return true
    }
  }

  function getAllLocalStorage () {
    let ls = Object.keys(localStorage)
    ls = ls.map(item => {
      return {
        name: item,
        value: getLocalStorageByName(item)
      }
    })
    return ls.sort((item, item2) => {
      let c1 = item.name.charAt(0).toLowerCase()
      let c2 = item2.name.charAt(0).toLowerCase()
      if (c1 === c2) {
        return 0
      } else {
        return (c1 > c2) ? 1 : -1
      }
    })
  }

  function reloadLocalStorage () {
    let localStorageBox = document.querySelector('#enkel-local-storage-box')
    if (localStorageBox) {
      let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
      if (localStorageBoxContent) {
        localStorageBox.removeChild(localStorageBoxContent)
      }
      initLocalStorageBoxContent(localStorageBox)
    }
  }
  function initLocalStorageBoxContent (localStorageBox) {
    let localStorageBoxContent = document.querySelector('#enkel-local-storage-box-content')
    if (!localStorageBoxContent) {
      localStorageBoxContent = document.createElement('div')
      localStorageBoxContent.id = 'enkel-local-storage-box-content'

      let allLocalStorage = getAllLocalStorage()
      if (allLocalStorage.length === 0) {
        watchItemLength()
        // if (!localStorageBoxContent.classList.contains('empty')) {
        //   localStorageBoxContent.classList.add('empty')
        // }
        // localStorageBoxContent.innerText = '无localStorage'
      } else {
        for (let i = 0; i < allLocalStorage.length; i++) {
          localStorageBoxContent.appendChild(initLocalStorageItem(allLocalStorage[i]))
        }
      }
      let localStorageBoxFooter = document.querySelector('#enkel-local-storage-box-footer')
      if (localStorageBoxFooter) {
        localStorageBox.insertBefore(localStorageBoxContent, localStorageBoxFooter)
      } else {
        localStorageBox.appendChild(localStorageBoxContent)
      }
    }
  }

  function initLocalStorageItem (ls) {
    let localStorageEle = document.createElement('div')
    localStorageEle.className = 'enkel-local-storage-item'

    let localStorageLabel = document.createElement('div')
    localStorageLabel.className = 'enkel-local-storage-item-label'
    localStorageLabel.innerText = ls.name
    localStorageLabel.setAttribute('title', ls.name)
    localStorageEle.appendChild(localStorageLabel)

    let localStorageValue = document.createElement('div')
    localStorageValue.className = 'enkel-local-storage-item-value'
    localStorageValue.setAttribute('contenteditable', true)
    localStorageValue.setAttribute('spellcheck', false)
    localStorageValue.innerText = ls.value
    localStorageValue.oninput = function (e) {
      document.ls = ls.name + '=' + e.target.innerText.trim()
    }
    localStorageEle.appendChild(localStorageValue)

    let localStorageDelete = document.createElement('div')
    localStorageDelete.className = 'enkel-local-storage-item-delete'
    localStorageDelete.innerHTML = '&times;'
    localStorageDelete.onclick = function () {
      let deleted = deleteLocalStorageByName(ls.name)
      deleted && localStorageEle.parentNode.removeChild(localStorageEle)
    }
    localStorageEle.appendChild(localStorageDelete)

    return localStorageEle
  }

  window.addEventListener('storage', (e) => {
    let objStr = Object.prototype.toString
    if ((objStr.call(e.key) === '[object Null]') && (objStr.call(e.newValue) === '[object Null]') && (objStr.call(e.oldValue) === '[object Null]')) {
      // localStorage清空
      removeAllItemElem()
    } else {
      if (objStr.call(e.newValue) === '[object Null]') {
        // 删除localStorage
        deleteItemElem({
          name: e.key,
          value: e.newValue
        })
      } else if ((objStr.call(e.oldValue) === '[object Null]') && (e.newValue === '')) {
        // 新增localStorage
        insertLocalStorageItem({
          name: e.key,
          value: e.newValue
        })
      } else {
        // 修改localStorage
        modifyItemElem({
          name: e.key,
          value: e.newValue
        })
      }
    }
    // showMessage('localStorage有更新')
    // reloadLocalStorage()
    // insertLocalStorageItem({
    //   name: e.key,
    //   value: e.newValue
    // })
  })

  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'local-storage') {
      /**
       * localStorage 操作
       */
      let localStorageBox = getLocalStorageBox()

      setTimeout(() => {
        showLocalStorageBox(localStorageBox)
      }, 200)
    }
  })
})


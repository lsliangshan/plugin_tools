document.addEventListener('DOMContentLoaded', function () {

  const refreshIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wEJAwEXhOKvaQAABWdJREFUaN7V2muIVVUUB/DfOKZlRrcJHz1sxqaHaBE0hWBEKFYUCdH7QQRWUJRZWfQxKKjsRe/sXVT0hIoKKszKSIM+5CO0MlHLCNPylUU6OX1Y+zpnjmfuvfNwZtowzD33nH32/7/3Xmuv9V+3Tg9bc2NTj/qvXLO6R/3rehH0/hiT+RuUu78BP6e/DdjeG2S6RKAA+Ai04DRMwuGJyJCC7v9iG9bhO3yOT7ECW7tLpCYCBcCbcAkuxJHYp8tTF+0PLMVLeAe/d5VEVQI58CVMxxUYXwDmRzG7q8RMQ1vq14ixaBZbbGim7058hefwmlipmohUJJAD34LbcUam3zYswruYlwhsSaCL2lCMxLE4HVPFCu6V7rfijTTO97WQ6JRABnwdLsJdaRZhB+biYSzE5nz/7KAVPNXoROJaTMzgWYZZ+LAaiUICmQEH4WrcKYxTmpnZeEs3ja+A0EhcjutxaPruV8zEm5XeX1fl5dfgXuybrufiJmF4XQZeA5FJeBAnput1uBLvdzZWJQLn4Uk0pOvncSvW9xR4FSJNeFzYGqzExfi6PGb2+fpOXnQsnsEh6fpF3CIOoF4FDxs3b9JQKpUvN+FL4eWa0wQ24wP8nXkOhuxagQz4/dJsn5uuv8D5klvsTeBFLTeJ74jDsS1N4P3p3hhchZbBBe+4FGenz6twY1+Bz7WluA1PiYNyhjgrxgk7HE+ygQzr0cJgWsThcgMeKd/sKwIZPEPwgrABWCs81q5QJR9wnYPj0+cv8Eo/gicCvs9EHEW42A5xVnYL1Wk/TFrxqAgP+gv8KOHGp8s5m84ItImgahSW4+M+Qb17GyQCxZk4odrDeSOei/liBXbS54YLewuvVxU8aWlyfvhfKRjra/AJww5xDmzF0RheqU+3MrI91QpCixbh7y8UIfnAJtAJkXpMFgfZKTrmEQOTQCdEhuMscTZNzLIbsC1nm9vxLd7DLyI3KdXl910/eJ2aWoF9HIEJdc2NTdPwg0wK938iUtfc2PQPVouE+nn8NtBJ5AlkE/AFuEecwn//H4jkCcBficBsEb7uagORSBGBcluHl0VauWKgEhlc4d4oIW1MwwNCr9nY1wCLJJnsBA6q4R1HYY7QgPbuR/BDy3iz39dCgFAGFoootT/aZHGAPYQDsjeqEViPJ3CmkDr6g8Aw3IxThSY7Lnuzkg1sEGrZR1JuQL9kZ2dgSvq8QpxZu1p+BVqFGyXC1+Z+Bl8SaWXZ9l4VkmMhgeW4TkgZrWJ1ZmmX+foaPCH6Tk6fl+H1/PP1DaXSJJELzxIS+WKRCU1IMzBeqMRbG0olGzdv6ivw00RUMAz/iHxgPh13Qn1DqfQmPhG6PpHSLRNGcyAOE3LGfGxrKJXsCSI58FOF0zgoXb8oVLlWdBi7vqFUKmsuVq5ZXY6/1wsRaWqagWOEoLRAqp70Jokc+Cl4TITLhC40QzpEu6JOE7WB+7TL6/OE1Lgk+1AvyetDcBnuyMz8IuEJl3Q2zm4ZWS4L+kaE1ycJfXKsWJVWkT9sJ1ajKyvS3NgkpzIfJypAt2g/qL4WtYHFWWz5VkuJiVAF7hbavUSgXGJaoHslpsGiPnaBOKDGpO/bRM3tZhEB7Pa+mggUDHy89iJf2f3+pb3I94nqRb5hwiGcKLzMyTg4c3+DMNY5ok5QEXxVAgUkSkJ+v1oYdrZly6x/CmFqi1ATysXvI9Ksj9Zx+27B23haiFpVgddMoIAE4VovEdXLo3Sv0L1TnKrz8Wz6v6Mr4GsmUIHICLG1Tlf9pwY7xMqsFdtunrCfVd0B3i0CFYhQ+ccebWK21+Insd12Zjt31xX3WJnryc9teiM4/A+2lqm4Jk0j8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMS0wOVQwMzowMToyMyswODowMDr6oXYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMDlUMDM6MDE6MjMrMDg6MDBLpxnKAAAAQ3RFWHRzb2Z0d2FyZQAvdXNyL2xvY2FsL2ltYWdlbWFnaWNrL3NoYXJlL2RvYy9JbWFnZU1hZ2ljay03Ly9pbmRleC5odG1svbV5CgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1NDY5NzQwODOXhblbAAAAEnRFWHRUaHVtYjo6U2l6ZQAxMDk1OEJ/OdVQAAAAYnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L25ld3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL2ZpbGVzLzExMy8xMTM4NDc5LnBuZy8ttocAAAAASUVORK5CYII='

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
  #enkel-cookie-box {
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
  #enkel-cookie-box-header {
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
  #enkel-cookie-box-header .title {
    color: rgba(11, 81, 15, 1);
    font-size: 16px;
    font-weight: 500;
  }
  #enkel-cookie-box-header .close {
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
  #enkel-cookie-box-header .enkel-cookie-reload {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    right: 48px;
    top: 18px;
  }
  #enkel-cookie-box-header .close:active {
    opacity: 0.7;
  }
  #enkel-cookie-box-content {
    width: 100%;
    height: calc(100% - 48px - 48px);
    overflow-y: auto;
    padding: 5px 0;
    box-sizing: border-box;
    background-color: rgba(11, 81, 15, 0.9);
  }
  #enkel-cookie-box-content.empty {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 300;
    text-shadow: 0 0 5px #000;
  }
  #enkel-cookie-box-content .enkel-cookie-item {
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
  #enkel-cookie-box-content .enkel-cookie-item:hover {
    background-color: rgba(11, 81, 15, 0.7);
  }
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-label {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value {
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
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value:hover {
    overflow-x: auto;
  }
  #enkel-cookie-box-content .enkel-cookie-item:hover .enkel-cookie-item-delete {
    opacity: 1;
  }
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-delete {
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
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value::-webkit-scrollbar {width: 2px;height: 2px;}                        
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value::-webkit-scrollbar-track,::-webkit-scrollbar-thumb {border-radius: 999px;border:0px solid transparent;}
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value::-webkit-scrollbar-track {}
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value::-webkit-scrollbar-thumb {min-height: 20px;background-clip: border-box;box-shadow: 0 0 0 5px rgba(255,255,255,.1) inset;}
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value::-webkit-scrollbar-corner {background: transparent;}
  #enkel-cookie-box-content .enkel-cookie-item .enkel-cookie-item-value[contenteditable]:focus {
    outline: none;
    background-color: rgba(11, 81, 15, 0.8);
  }
  #enkel-cookie-box-footer {
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
  #enkel-cookie-box-footer .enkel-custom-input:focus {
    outline: none;
  }
  #enkel-cookie-box-footer .enkel-cookie-add-label {
    width: 150px;
    height: 32px;
    line-height: 32px;
  }
  #enkel-cookie-box-footer .enkel-cookie-add-value {
    width: 220px;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
  }
  #enkel-cookie-box-footer .enkel-cookie-add-btn {
    padding: 4px 15px;
    border: none;
    background-color: rgba(11, 81, 15, 0.8);
    color: #fff;
    border-radius: 3px;
    transition: all .1s ease-in-out;
    -webkit-transition: all .1s ease-in-out;
    cursor: pointer;
  }
  #enkel-cookie-box-footer .enkel-cookie-add-btn:active {
    background-color: rgba(11, 81, 15, 1);
  }
  #enkel-cookie-box-footer .enkel-cookie-add-btn:focus {
    outline: none;
  }
  `)

  function getCookieBox () {
    let cookieBox = document.querySelector('#enkel-cookie-box')
    if (!cookieBox) {
      cookieBox = document.createElement('div')
      cookieBox.id = 'enkel-cookie-box'
      initCookieBoxHeader(cookieBox)
      initCookieBoxContent(cookieBox)
      initCookieBoxFooter(cookieBox)
      document.body.appendChild(cookieBox)
    }
    return cookieBox
  }

  function showCookieBox (cookieBox) {
    cookieBox.style.left = 0
  }
  function hideCookieBox (cookieBox) {
    cookieBox.style.left = '-490px'
  }

  function showMessage (msg) {
    let cookieBox = document.querySelector('#enkel-cookie-box')
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

      cookieBox.appendChild(messageBox)
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

  function hideMessage () {
    let messageBox = document.querySelector('#enkel-message-box')
    if (messageBox.classList.contains('show')) {
      messageBox.classList.remove('show')
    }
  }

  function initCookieBoxHeader (cookieBox) {
    let cookieBoxHeader = document.querySelector('#enkel-cookie-box-header')
    if (!cookieBoxHeader) {
      cookieBoxHeader = document.createElement('div')
      cookieBoxHeader.id = 'enkel-cookie-box-header'
      let title = document.createElement('div')
      title.className = 'title'
      title.innerText = 'Cookie管理'
      cookieBoxHeader.appendChild(title)

      let reload = document.createElement('img')
      reload.className = 'enkel-cookie-reload'
      reload.src = refreshIcon
      reload.title = '刷新Cookie'
      reload.onclick = function () {
        reloadCookieBoxContent(cookieBox)
      }
      cookieBoxHeader.appendChild(reload)

      let close = document.createElement('div')
      close.className = 'close'
      close.innerHTML = '&times;'
      close.onclick = function () {
        hideCookieBox(cookieBox)
      }
      cookieBoxHeader.appendChild(close)
      cookieBox.appendChild(cookieBoxHeader)
    }
  }

  let newCookie = {
    name: '',
    value: ''
  }

  function initCookieBoxFooter (cookieBox) {
    let cookieBoxFooter = document.querySelector('#enkel-cookie-box-footer')
    if (!cookieBoxFooter) {
      cookieBoxFooter = document.createElement('div')
      cookieBoxFooter.id = 'enkel-cookie-box-footer'

      let labelInput = document.createElement('input')
      labelInput.setAttribute('placeholder', '请输入Cookie名称')
      labelInput.className = 'enkel-cookie-add-label enkel-custom-input w150'
      labelInput.oninput = function (e) {
        newCookie.name = e.target.value.trim()
      }
      cookieBoxFooter.appendChild(labelInput)

      let valueInput = document.createElement('input')
      valueInput.setAttribute('placeholder', '请输入Cookie值')
      valueInput.className = 'enkel-cookie-add-value enkel-custom-input w240'
      valueInput.oninput = function (e) {
        newCookie.value = e.target.value.trim()
      }
      cookieBoxFooter.appendChild(valueInput)

      let btnAdd = document.createElement('button')
      btnAdd.className = 'enkel-cookie-add-btn'
      btnAdd.innerText = '新增'
      btnAdd.onclick = function () {
        if (!newCookie.name) {
          showMessage('Cookie名称不能为空')
        } else {
          let added = addCookie(newCookie)
          if (added) {
            watchItemLength()
            let cookieBoxContent = document.querySelector('#enkel-cookie-box-content')
            if (cookieBoxContent) {
              cookieBoxContent.appendChild(initCookieItem(newCookie))
              cookieBoxContent.scrollTop = 1000000
            }
            newCookie = {
              name: '',
              value: ''
            }
            labelInput.value = ''
            valueInput.value = ''
          }
        }
      }
      cookieBoxFooter.appendChild(btnAdd)

      cookieBox.appendChild(cookieBoxFooter)
    }
  }

  function getCookieByName (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]{0,})(;|$)")
    arr = document.cookie.match(reg)
    if (arr)
      return unescape(arr[2]);
    else
      return null
  }

  function hasCookie (name) {
    var reg = new RegExp("(^| )" + name + "=([^;]{0,})(;|$)")
    return !!document.cookie.match(reg)
  }

  function deleteCookieByName (name) {
    // delete-cookie
    // chrome.extension.sendMessage.addListener((request, sender, sendResponse) => {
    //   if (request.action === 'cookie') {
    //     /**
    //      * cookie 操作
    //      */
    //     let cookieBox = getCookieBox()

    //     setTimeout(() => {
    //       showCookieBox(cookieBox)
    //     }, 200)
    //   }
    // })
    return new Promise((resolve, reject) => {
      chrome.extension.sendMessage({
        action: "delete-cookie",
        name: name,
        href: location.origin
      }, function (response) {
        if (response) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    })
  }

  function addCookie (cookie) {
    if (hasCookie(cookie.name)) {
      showMessage('Cookie【' + cookie.name + '】已经存在')
      return false
    } else {
      document.cookie = cookie.name + '=' + cookie.value
      return true
    }
  }

  function getAllCookies () {
    let cookies = []
    if (document.cookie.trim()) {
      var aCookie = document.cookie.split(";")
      for (var i = 0; i < aCookie.length; i++) {
        // var aCrumb = aCookie[i].split("=")
        let _index = aCookie[i].indexOf('=')
        var aCrumb = [aCookie[i].substring(0, _index), aCookie[i].substring(_index + 1)]
        // if (aCrumb[1].indexOf('=') < 0) {
        cookies.push({
          name: aCrumb[0].trim(),
          value: aCrumb[1].trim()
        })
        // }
      }
    }
    return cookies.sort((item, item2) => {
      let c1 = item.name.charAt(0).toLowerCase()
      let c2 = item2.name.charAt(0).toLowerCase()
      if (c1 === c2) {
        return 0
      } else {
        return (c1 > c2) ? 1 : -1
      }
    })
  }

  function watchItemLength (allCookies) {
    let cookieBoxContent = document.querySelector('#enkel-cookie-box-content')
    if (cookieBoxContent) {
      if (!allCookies || (allCookies.length === 0)) {
        if (!cookieBoxContent.classList.contains('empty')) {
          cookieBoxContent.classList.add('empty')
        }
        cookieBoxContent.innerText = '良心网站，无Cookie'
      } else {
        if (cookieBoxContent.classList.contains('empty')) {
          cookieBoxContent.innerText = cookieBoxContent.innerText.replace('良心网站，无Cookie', '')
          cookieBoxContent.classList.remove('empty')
        }
      }
    }
  }

  function initCookieBoxContent (cookieBox) {
    let cookieBoxContent = document.querySelector('#enkel-cookie-box-content')
    if (!cookieBoxContent) {
      cookieBoxContent = document.createElement('div')
      cookieBoxContent.id = 'enkel-cookie-box-content'

      let allCookies = getAllCookies()
      if (allCookies.length === 0) {
        if (!cookieBoxContent.classList.contains('empty')) {
          cookieBoxContent.classList.add('empty')
        }
        cookieBoxContent.innerText = '良心网站，无Cookie'
        // watchItemLength(allCookies)
      } else {
        for (let i = 0; i < allCookies.length; i++) {
          cookieBoxContent.appendChild(initCookieItem(allCookies[i]))
        }
      }
      let cookieBoxFooter = document.querySelector('#enkel-cookie-box-footer')
      if (cookieBoxFooter) {
        cookieBox.insertBefore(cookieBoxContent, cookieBoxFooter)
      } else {
        cookieBox.appendChild(cookieBoxContent)
      }
    }
  }

  function reloadCookieBoxContent (cookieBox) {
    let cookieBoxContent = document.querySelector('#enkel-cookie-box-content')
    if (cookieBoxContent) {
      cookieBox.removeChild(cookieBoxContent)
    }
    // watchItemLength()
    initCookieBoxContent(cookieBox)
  }

  function initCookieItem (cookie) {
    let cookieItem = document.createElement('div')
    cookieItem.className = 'enkel-cookie-item'

    let cookieItemLabel = document.createElement('div')
    cookieItemLabel.className = 'enkel-cookie-item-label'
    cookieItemLabel.innerText = cookie.name
    cookieItemLabel.setAttribute('title', cookie.name)
    cookieItem.appendChild(cookieItemLabel)

    let cookieItemValue = document.createElement('div')
    cookieItemValue.className = 'enkel-cookie-item-value'
    cookieItemValue.setAttribute('contenteditable', true)
    cookieItemValue.setAttribute('spellcheck', false)
    cookieItemValue.innerText = cookie.value
    cookieItemValue.oninput = function (e) {
      document.cookie = cookie.name + '=' + e.target.innerText.trim()
    }
    cookieItem.appendChild(cookieItemValue)

    let cookieItemDelete = document.createElement('div')
    cookieItemDelete.className = 'enkel-cookie-item-delete'
    cookieItemDelete.innerHTML = '&times;'
    cookieItemDelete.onclick = async function () {
      let deleted = await deleteCookieByName(cookie.name)
      if (deleted) {
        cookieItem.parentNode.removeChild(cookieItem)
        watchItemLength(getAllCookies())
      }
    }
    cookieItem.appendChild(cookieItemDelete)

    return cookieItem
  }

  chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'cookie') {
      /**
       * cookie 操作
       */
      let cookieBox = getCookieBox()

      setTimeout(() => {
        showCookieBox(cookieBox)
      }, 200)
    }
  })
})


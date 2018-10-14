document.addEventListener('DOMContentLoaded', function () {
  chrome.extension.sendMessage({
    location: location.href,
    action: 'userscript'
  }, function (response) {
    loadScriptString(response.script)
  })
  // document.body.innerHTML = '<p style="color: darkcyan; font-size: 40px;">测试</p>'
  let content = document.body.innerText
  let result = ''
  if (content !== '') {
    try {
      JSON.parse(content)
    } catch (e) {
      return
    }
    insertCssAndJs();
    document.body.style.fontSize = "14px";
    let currentJsonStr
    try {
      let currentJson = jsonlint.parse(content)
      currentJsonStr = JSON.stringify(currentJson)
      result = new JSONFormat(content, 4).toString()
    } catch (e) {
      result = '<span style="color: #f1592a; font-weight: bold;">' + e + '</span>'
      currentJsonStr = result
    }
    document.body.innerHTML = result;

    addJsonOperation();
  } else {}
})

const insertCssAndJs = function () {
  let style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  document.getElementsByTagName('head')[0].appendChild(style);

  let script = document.createElement('script');
  script.src = 'https://static.dei2.com/tools/js/jquery.json.js'
  document.getElementsByTagName('head')[0].appendChild(script);
}

const addJsonOperation = function () {
  // let html = '<div style="position: fixed; right: 15px; top: 15px; min-width: 100px; height: 36px; background-color: red; z-index: 9999;">' +
  //   '' +
  //   '</div>'
  // document.body.innerHTML += html
}

const expandAll = function (currentJsonStr) {
  currentJsonStr.trim() !== '' && (new JSONFormat(currentJsonStr, 4).showAll())
}

const compressAll = function (currentJsonStr) {
  currentJsonStr.trim() !== '' && (new JSONFormat(currentJsonStr, 4).hideAll())
}

function loadScriptString(code) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  try {
    // firefox、safari、chrome和Opera
    script.appendChild(document.createTextNode(code));
  } catch (ex) {
    // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
    script.text = code;
  }
  document.getElementsByTagName("head")[0].appendChild(script);
}
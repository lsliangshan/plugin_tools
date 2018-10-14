function loadScript(url) {
  return new Promise((resolve) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          resolve(true)
        }
      }
    } else {
      script.onload = function () {
        resolve(true)
      }
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // loadScript('https://static.dei2.com/extensions/js/filer.js').then(response => {	
  // 	setTimeout(() => {
  // 		let filer = new Filer()
  // 		filer.init()
  // 		filer.open('/main.js', function (file) {
  // 			let reader = new FileReader()
  // 			reader.onload = function (e) {
  // 				console.log('file content: ', this.result)
  // 			}
  // 			reader.readAsText(file)
  // 		})
  // 	}, 3000)
  // })
  // alert(localStorage.getItem('zpim'))
  // eval(word)
  // localStorage.setItem('test', 'alert("Dynamic generation");')
  // eval(localStorage.getItem('test'))
  //  $('#kw').val('ce shi 2')
  window.addEventListener('message', function (e) {
    console.log('on message: ', e)
  }, false)
  //  window.webkitRequestFileSystem(window.PERSISTENT, 5*1024*1024, function (fs) {
  //   fs.root.getFile(chrome.extension.getURL('userScripts.txt'), {}, function (fileEntry) {
  //     fileEntry.file(function (file) {
  //       let reader = new FileReader()

  //       reader.onloadend = function (e) {
  //         console.log('reader onloadend: ', e.target.result)
  //       }
  //       reader.readAsText(file)
  //     }, function (e) {
  //       console.log('reader file error: ', e.toString())
  //     })
  //   }, function (e) {
  //     console.log('getFile error: ', e.toString())
  //   })
  // }, function (e) {
  //   console.log('webkitRequestFileSystem error: ', e.toString())
  // })
  // $('#su').trigger('click')
})
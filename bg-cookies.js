document.addEventListener('DOMContentLoaded', function () {
  console.log('Cookies: ', document.cookie)
})

function getBox () {
  let enkelCookieBox = document.querySelector('#enkel-cookie-box')
  if (!enkelCookieBox) {
    enkelCookieBox = document.createElement('div')
    enkelCookieBox.id = 'enkel-cookie-box'
    document.body.appendChild(enkelCookieBox)
  }
  return enkelCookieBox
}
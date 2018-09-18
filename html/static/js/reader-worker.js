let reader = new FileReader()

function workerFileToBase64 (f) {	
	return new Promise((resolve) => {
		reader.readAsDataURL(f)
		reader.onload = function (e) {			
			resolve(this.result)
		}
	})	
}

onmessage = async function (event) {
	if (event.data.name === 'file-to-base64') {
		let imageBase64 = await workerFileToBase64(event.data.data)
		postMessage({
			name: 'file-to-base64',
			data: {
				image: imageBase64
			}
		})
	}
}
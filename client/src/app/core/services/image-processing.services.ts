let dataURLToBlob = function (dataURL: string) {
  let marker: string = ';base64,';
  if (dataURL.indexOf(marker) == -1) {
    let parts: string[] = dataURL.split(',');
    let contentType: string = parts[0].split(':')[1];
    let raw: string = parts[1];
    return new Blob([raw], { type: contentType });
  }

  let parts = dataURL.split(marker);
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

function resizeImage(event: Event, size: number) {
  let files = event.target['files'];
  return new Promise((resolve, reject) => {
    let file = files[0];
    if (file['type'].match(/image.*/)) {
      let reader = new FileReader();
      reader.addEventListener('load', rEvent => {
        let image = new Image();
        image.addEventListener('load', () => {
          console.log('in');
          let canvas: HTMLCanvasElement = document.createElement('canvas');
          let width: number = image.width;
          let height: number = image.height;
          canvas.width = canvas.height = width = height = size;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/png', 72);
          resolve(dataURLToBlob(dataUrl));
        });
        image.src = rEvent.target.result.toString();
      });
      reader.readAsDataURL(file);
    }
  });
}

export {
  resizeImage
};

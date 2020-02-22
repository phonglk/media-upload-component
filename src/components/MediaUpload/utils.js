import axios from 'axios';

export const compressImage = (file, qualityRatio) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Unexpected Error'));
    };
    img.onload = () => {
      try {
        URL.revokeObjectURL(img.src);
        const { width, height } = img;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', qualityRatio);
        resolve(dataUrl);
      } catch (e) {
        reject(e);
      }
    };
    img.src = URL.createObjectURL(file);
  });

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

const UPLOAD_PATH='/upload';
export function upload(endpoint, file, onProgress, onDone, onError) {
  const formData = new FormData();
  formData.append('file', file);
  axios.post(endpoint + UPLOAD_PATH, formData, {
    onUploadProgress: (evt) => {
      const progress = evt.loaded / evt.total;
      onProgress(progress);
    }
  })
    .then((resp) => {
      const path = resp.data.path;
      onDone({ path: endpoint + path });
    })
    .catch(onError);
}

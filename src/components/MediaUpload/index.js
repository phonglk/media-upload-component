import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from './Dropzone';
import Compressor from './Compressor';
import Preview from './Preview';
import { dataURItoBlob, upload } from './utils';
import './style.scss';

MediaUpload.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  uploadServer: PropTypes.string
};
MediaUpload.defaultProps = {
  width: '100%',
  height: '70%'
};
export default function MediaUpload (props) {
  const { width, height, uploadServer } = props;
  const [file, setFile] = useState(null);
  /**
   * -1 no uploading is in progress
   * [0, 1) uploading ...
   * 1 upload is done
   **/
  const [progress, setProgress] = useState(-1);
  const [imageUrl, setImageUrl] = useState(null);
  const onFileAdd = (files) => {
    if (files.length > 1) alert('Multiple files detected. Only first file being process');
    const file = files[0];
    setFile(file);
  };
  const cancel = () => setFile(null);
  const doUpload = () => {
    const file = dataURItoBlob(imageUrl);
    upload(uploadServer, file, setProgress, (resp) => {
      console.log(resp);
    }, (err) => {
      alert(`Error while uploading image: ${err.message}`);
      setProgress(-1);
    });
  };
  return (
    <div className="media-upload" style={{width, height}}>
      {file === null
        ? <Dropzone onFileAdd={onFileAdd} />
        : [
          <div className="toolbar" key={0}>
            <button onClick={cancel} title="Upload another image">Cancel</button>
            <Compressor file={file} onDone={setImageUrl} />
            <button onClick={doUpload} title="Upload image with current quality">Upload</button>
          </div>,
          <Preview url={imageUrl} key={1} />
        ]
      }
    </div>
  );
}
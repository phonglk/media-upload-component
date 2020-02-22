import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from './Dropzone';
import Compressor from './Compressor';
import Preview from './Preview';
import { dataURItoBlob, upload } from './utils';
import './style.scss';
import Progress from './Progress';

MediaUpload.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  uploadServer: PropTypes.string
};
MediaUpload.defaultProps = {
  width: '100%',
  height: '70%',
  uploadServer: ''
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
  const [serverImageUrl, setServerImageUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const onFileAdd = (files) => {
    if (files.length > 1) alert('Multiple files detected. Only first file being process');
    const file = files[0];
    setFile(file);
  };
  const cancel = () => {
    setFile(null);
    setProgress(-1);
    setImageUrl(null);
    setServerImageUrl(null);
  };
  const onCompressError = (err) => {
    cancel();
    alert(`Error while processing image: ${err.message}. Please try another file`);
  };
  const doUpload = () => {
    const file = dataURItoBlob(imageUrl);
    upload(uploadServer, file, setProgress, (resp) => {
      setServerImageUrl(resp.path);
    }, (err) => {
      alert(`Error while uploading image: ${err.message}`);
      setProgress(-1);
    });
  };
  const isUploadMode = progress > -1;
  const isUploadDone = serverImageUrl !== null;
  const isUploading = isUploadMode && !isUploadDone;
  const cancelBtnTxt = isUploadMode ? isUploadDone ? 'Done' : 'Uploading' : 'Cancel';
  return (
    <div
      className={classNames('media-upload', {
        'upload-mode': isUploadMode,
        'upload-done': isUploadDone
      })}
      style={{ width, height }}
    >
      {file === null ? (
        <Dropzone onFileAdd={onFileAdd} />
      ) : (
        [
          <div className="toolbar" key={0}>
            <button
              onClick={cancel}
              title="Upload another image"
              disabled={isUploading}
            >
              {cancelBtnTxt}
            </button>
            <div className="upload-status">
              <Progress value={progress} />
              <a
                className="image-path"
                href={serverImageUrl}
                title="Link to uploaded image"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link to uploaded Image
              </a>
            </div>
            <Compressor
              file={file}
              onDone={setImageUrl}
              onError={onCompressError}
            />
            <button
              onClick={doUpload}
              className="btn-upload"
              title="Upload image with current quality"
            >
              Upload
            </button>
          </div>,
          <Preview url={imageUrl} key={1} />
        ]
      )}
    </div>
  );
}
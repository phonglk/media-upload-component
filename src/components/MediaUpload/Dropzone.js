import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import icon from './icons8-upload-to-cloud-50.png';

Dropzone.propTypes = {
  isDisabled: PropTypes.bool,
  onFileAdd: PropTypes.func
};
export default function Dropzone(props) {
  const { isDisabled, onFileAdd } = props;
  const [isHighlight, setHighlight] = useState(false);
  const fileInput = useRef(null);

  const openFileInput = () => !isDisabled && fileInput.current.click();
  const onDragOver = (evt) => {
    evt.preventDefault();
    if (!isDisabled) setHighlight(true);
  };
  const onDragLeave = () => setHighlight(false);
  const onDrop = (evt) => {
    evt.preventDefault();
    if (isDisabled) return;
    onFileAdd && onFileAdd(evt.dataTransfer.files);
    setHighlight(false);
  };
  const onFileInputChange = (evt) => {
    if (isDisabled) return;
    onFileAdd && onFileAdd(evt.target.files);
  };
  const text = isHighlight ? 'Drop it!' : 'Click or drag file into this box to upload';

  return (
    <div
      className={classNames('dropzone', {
        highlight: isHighlight,
        disabled: isDisabled
      })}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileInput}
    >
      <input
        ref={fileInput}
        className="file-input"
        type="file"
        onChange={onFileInputChange}
      />
      <img
        alt="upload"
        className="Icon"
        src={icon}
      />
      <span>{text}</span>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compressImage } from './utils';

const parseValue = evt => parseFloat(evt.target.value);
Compressor.propTyes = {
  file: PropTypes.object,
  onDone: PropTypes.func
};
export default function Compressor(props) {
  const { file, onDone } = props;
  const [ratio, setRatio] = useState(0.85);
  useEffect(() => {
    if (!file) return;
    compressImage(file, ratio).then(onDone);
  }, [ratio, file]);
  return file ? (
    <div className="compress-image">
      <span>Quality</span>
      <input
        type="range"
        value={ratio}
        min={0.05}
        max={1}
        step={0.05}
        onChange={_.flow(parseValue, setRatio)}
      />
      <span>{Math.round(ratio*100)}%</span>
    </div>
  ) : null;
}

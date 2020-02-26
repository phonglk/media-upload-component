import React from 'react';
import PropTypes from 'prop-types';

Progress.propTypes = {
  value: PropTypes.number,
};
export default function Progress(props) {
  const pct = Math.round(props.value * 100);
  const width = `${pct}%`;
  return (
    <div className="progress">
      <div className="progress-outer">
        <div className="progress-inner" style={{width}}>
          {width}
        </div>
      </div>
    </div>
  );
}

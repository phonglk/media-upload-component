import React from 'react';
import PropTypes from 'prop-types';

Preview.propTypes = {
  url: PropTypes.string
};
export default function Preview(props) {
  const style = {
    backgroundImage: `url(${props.url})`
  };
  return (
    <div className="preview" style={style} />
  );
}

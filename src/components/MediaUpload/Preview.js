import React from 'react';

export default function Preview(props) {
  const style = {
    backgroundImage: `url(${props.url})`
  };
  return (
    <div className="preview" style={style} />
  );
}

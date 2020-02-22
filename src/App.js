import React from 'react';
import './App.css';
import MediaUpload from './components/MediaUpload';

function App() {
  return (
    <div className="App">
      <MediaUpload width="600px" height="600px" uploadServer={process.env.REACT_APP_UPLOAD_SERVER} />
    </div>
  );
}

export default App;

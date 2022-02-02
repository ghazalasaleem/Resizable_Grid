import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './BasicGrid/App';
// import Grid from './AntdGrid/Grid';
// import ResizableGrid from './AntdGrid/ResizeGrid/ResizableGrid';
import ResizeGrid from './AntdGrid/ResizeGrid/ResizeGrid';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Grid /> */}
    {/* <ResizableGrid /> */}
    <ResizeGrid />
  </React.StrictMode>,
  document.getElementById('root')
);

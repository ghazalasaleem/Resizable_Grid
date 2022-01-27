import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './BasicGrid/App';
// import Grid from './AntdGrid/Grid';
// import ResizableGrid from './AntdGrid/ResizeGrid/ResizableGrid';
import TestGrid from './AntdGrid/ResizeGrid/TestGrid';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Grid /> */}
    {/* <ResizableGrid /> */}
    <TestGrid />
  </React.StrictMode>,
  document.getElementById('root')
);

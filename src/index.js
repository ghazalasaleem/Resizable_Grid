import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './BasicGrid/App';
// import Grid from './AntdGrid/Grid';
import ResizeGrid from './AntdGrid/ResizeGrid/ResizeGrid';
import ResizeGridNew from './AntdGrid/ResizeGrid_New/ResizeGridNew';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Grid /> */}
    {/* <ResizeGrid /> */}
    <ResizeGridNew />
  </React.StrictMode>,
  document.getElementById('root')
);

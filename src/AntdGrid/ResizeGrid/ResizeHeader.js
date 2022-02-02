import React, { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import './ResizeHeader.scss';

const TestHeader = (props) => {
  const {
    minWidth,
    maxWidth,
    onResize,
    isFixed,
    ...restProps
  } = props;

  // const [customWidth, setCustomWidth] = useState(maxWidth);

  // useEffect(() => {
  //   setCustomWidth(maxWidth);
  // },[maxWidth]);

  const setBodyStyle = (active) => {
    document.body.style.userSelect = active ? 'none' : '';
    document.body.style.pointerEvents = active ? 'none' : '';
    document.documentElement.style.cursor = active ? 'col-resize' : '';
  };
  const onResizeStart = (e, { size }) => {
    setBodyStyle(true);
    // setCustomWidth(size.width);
  };
  // const onSelfResize = (e, { size }) => {
  //   setCustomWidth(size.width);
  // };
  const onResizeStop = () => {
    // onResize(customWidth);
    setBodyStyle(false);
  };


  return (isFixed?
    <th {...restProps} 
    // style={{
    //   minWidth: minWidth,
    //   maxWidth: maxWidth
    // }}
    />:
    <Resizable
      // width={customWidth}
      width={maxWidth}
      height={0}
      handle={
        <span
        className="react-resizable-handle"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />}
      onResizeStart={onResizeStart}
      // onResize={onSelfResize}
      onResize={onResize}
      onResizeStop={onResizeStop}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} style={{
        minWidth: minWidth,
        maxWidth: maxWidth
      }} />
    </Resizable>
  );
};

TestHeader.propTypes = {
  onResize: PropTypes.func,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  isFixed: PropTypes.bool
};

TestHeader.defaultProps = {
  minWidth: 20,
  maxWidth: 20,
  onResize: () => {},
  isFixed: false
};

export default TestHeader;
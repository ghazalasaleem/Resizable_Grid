import React from 'react';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import './ResizeHeader.scss';

const ResizeHeader = (props) => {
  const {
    minWidth,
    maxWidth,
    onResize,
    isFixed,
    ...restProps
  } = props;

  const setBodyStyle = (active) => {
    document.body.style.userSelect = active ? 'none' : '';
    document.body.style.pointerEvents = active ? 'none' : '';
    document.documentElement.style.cursor = active ? 'col-resize' : '';
  };
  const onResizeStart = (e, { size }) => {
    setBodyStyle(true);
  };

  const onResizeStop = () => {
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

ResizeHeader.propTypes = {
  onResize: PropTypes.func,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  isFixed: PropTypes.bool
};

ResizeHeader.defaultProps = {
  minWidth: 20,
  maxWidth: 20,
  onResize: () => {},
  isFixed: false
};

export default ResizeHeader;
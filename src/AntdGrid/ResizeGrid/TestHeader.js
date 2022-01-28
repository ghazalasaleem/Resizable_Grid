import React, { useEffect } from 'react';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import './TestHeader.scss';

const TestHeader = (props) => {
  const {
    minWidth,
    maxWidth,
    onResize,
    isFixed,
    ...restProps
  } = props;

  useEffect(() => {
    console.log(props);
  }, [props]);

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
      onResize={onResize}
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
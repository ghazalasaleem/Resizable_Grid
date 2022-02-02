import React from 'react';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const ResizableCell = (props) => {
  const {
    minWidth,
    maxWidth,
    ...restProps
  } = props;
  useEffect(() => {
    console.log('1- ', props);
  }, [props])

  return (<td { ...restProps } style={{
    minWidth: minWidth,
    width: minWidth
    }}/>);
};

ResizableCell.propTypes = {
  maxWidth: PropTypes.number,
  minWidth: PropTypes.number
};

ResizableCell.defaultProps = {
};

export default ResizableCell;
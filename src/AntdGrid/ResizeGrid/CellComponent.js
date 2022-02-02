import React from 'react';
import PropTypes from 'prop-types';

const TestCell = (props) => {
  const {
    minWidth,
    maxWidth,
    isFixed,
    ...restProps
  } = props;
  return (isFixed? <td {...restProps} /> :
  <td {...restProps} style={{
    minWidth: minWidth,
    maxWidth: maxWidth
  }}/>);
};

TestCell.propTypes = {
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  isFixed: PropTypes.bool
};

TestCell.defaultProps = {
  minWidth: 20,
  maxWidth: 20,
  isFixed: false
};

export default TestCell;
import React from 'react';
import PropTypes from 'prop-types';

const TestCell = (props) => {
  const {
    minWidth,
    maxWidth,
    ...restProps
  } = props;
  return <td {...restProps} style={{
    minWidth: minWidth,
    maxWidth: maxWidth
  }}/>;
};

TestCell.propTypes = {
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number
};

TestCell.defaultProps = {
  minWidth: 20,
  maxWidth: 20
};

export default TestCell;
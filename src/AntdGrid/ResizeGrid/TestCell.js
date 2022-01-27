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

export default TestCell;
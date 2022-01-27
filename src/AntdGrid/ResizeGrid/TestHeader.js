const TestHeader = (props) => {
  const {
    minWidth,
    maxWidth,
    ...restProps
  } = props;
  return <th {...restProps} style={{
    minWidth: minWidth,
    maxWidth: maxWidth
  }}/>;
};

export default TestHeader;
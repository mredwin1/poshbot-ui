const Options = (props) => {
  const { options, name } = props;
  return options.map((option) => {
    const key = typeof name !== 'undefined' ? `${name}-${option}` : option;
    return <option key={key}>{option}</option>;
  });
};

export default Options;

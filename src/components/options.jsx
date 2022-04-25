const Options = (props) => {
  const { options, name } = props;
  return options.map((option) => {
    return <option key={`${name}-${option}`}>{option}</option>;
  });
};

export default Options;

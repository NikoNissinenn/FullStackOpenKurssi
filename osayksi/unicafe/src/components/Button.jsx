const Button = ({value, setValue, text}) => {

  const setFunction = (setValue, value) => () => {
    setValue(value + 1);
  };

  return (
    <button onClick={setFunction(setValue, value)}>{text}</button>
  )
}

export default Button;
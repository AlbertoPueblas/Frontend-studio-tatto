import "./CustomInput.css"

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled,
  // onBlurHandler
}) => {
  // props, properties, propiedades, se reciben como un objeto

  return (
    <input className="customInputDesign"
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value}
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}
      // onBlur={(e) => onBlurHandler(e)}
      >
      </input>
  );
};


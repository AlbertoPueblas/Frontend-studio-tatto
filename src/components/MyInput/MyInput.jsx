import "./MyInput.css"

export const MyInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled,
  // isValidContent
}) => {
  // props, properties, propiedades, se reciben como un objeto
  return (
      <input className={"InputDesign"}
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value || ""}
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}

      >
      </input>
  );
};
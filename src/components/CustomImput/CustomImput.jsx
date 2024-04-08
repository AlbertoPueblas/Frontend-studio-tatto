

export const CustomImput = ({
    typeProp, nameProp, placeholderProp, handlerProp}) => {
 
    return (
        <input
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        onChange={(e) => handlerProp(e)}
        >
        </input>
    )
}
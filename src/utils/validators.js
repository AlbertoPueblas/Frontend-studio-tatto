
export const inputValidator = (inputValue, inputName) => {
    if (inputValue === "") {
        return false
    }
    if ((inputName === "firstName" || inputName === "lastname") && typeof(inputValue) === "string") {
        return "Campo necesario"
    }
    if (inputName === "password" && typeof(inputValue) === "string" && inputValue.length >= 6 && inputValue.length <= 12) {
        return "la contraseña debe tener entre 6 y 10 caracteres"
    }
    if (inputName === "email" && inputValue.includes("@") && inputValue.includes(".")) {
        return "Introduce un email valido"
    }

    return false
}
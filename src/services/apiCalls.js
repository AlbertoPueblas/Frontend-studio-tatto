import axios from "axios";

//--------------------------------------------

// const API_URL = "https://rickandmortyapi.com/api"
// const API_URL = "http://localhost:3307/api"

export const registerNewUserCall = async() => {

}

export const loginCall = async() => {

}

export const bringAllCharacters = async() => {
    const res = await axios.get(`${API_URL}/`, /*headers*/)

    return res.data.results

}
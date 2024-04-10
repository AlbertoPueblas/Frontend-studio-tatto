import axios from "axios";

//--------------------------------------------

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api"

export const registerNewUserCall = async() => {

}

export const loginCall = async (credentials) => {
    console.log(credentials)
    const res = await axios.post(`${API_URL}/login`, credentials);
    console.log(res)
    return res.data.results
  };
  

export const bringAllCharacters = async() => {
    const res = await axios.get(`${API_URL}/users`, /*headers*/)

    return res.data.results

};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}/profile`, config)
  return res.data.results
}
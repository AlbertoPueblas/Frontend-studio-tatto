import axios from "axios";

//--------------------------------------------

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api/"

export const registerNewUserCall = async (credentials) => {
  console.log("hola Register");
  return axios.post(`${API_URL}auth/register`, credentials);
};

export const loginCall = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  console.log(credentials, "aqui loginCall");
  console.log(res);
  return res
};

export const bringAllCharacters = async() => {
    const res = await axios.get(`${API_URL}users`, /*headers*/)

    return res.data.results

};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}users/profile`, config)
  return res.data
}

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.put(`${API_URL}users/profile`, data, config)
  console.log(res, "yo soy updateProfile")
  return res
}

export const loginOut = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/profile`, credentials);
  console.log(credentials, "aqui logOut");
  console.log(res);
  return res
};

export const deleteUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("yo soy deleteProfile")
  const res = await axios.put(`${API_URL}users/profile`,data, config)
  console.log("que ha pasao",res);
  return res
}
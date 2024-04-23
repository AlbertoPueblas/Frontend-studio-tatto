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

export const bringAllCharacters = async () => {
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

export const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}users/${id}`, config)
  return res.data
}

export const putUserId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("yo soy deleteProfile")
  return axios.put(`${API_URL}users/profile/${id}`, config)
}

export const deleteUserId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("yo soy deleteProfile")
  return axios.delete(`${API_URL}users/profile/${id}`, config)
}

export const bringAllUsers = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.get(`${API_URL}users/allUsers?limit=50?pages=10`, config /*headers*/)

}

// export const bringAllappointment = async (appointmentData,token) => {

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   return axios.get(`${API_URL}users/dates`,appointmentData, config /*headers*/)

// };
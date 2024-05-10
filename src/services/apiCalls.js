import axios from "axios";

//--------------------------------------------

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api/"

// Users calls
export const appointmentCreate = async(appCreate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(appCreate,"aqui citas o no????");
  const res = await axios.post(`${API_URL}dates/appointment`,appCreate, config);
  console.log(config, "Hello?");
  return res
}

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}users`, /*headers*/)
  
  return res.data.results
  
};

export const bringDates = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}users/dates`, config)
  return res.data
}

export const bringOneDate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(id, token);
  const res = await axios.get(`${API_URL}dates/myDate/${id}`, config)
  return res
}

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}users/profile`, config)
  return res.data
}

export const deleteApointment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("yo soy deletedate")
  return axios.delete(`${API_URL}dates/delete`,data, config)
}
export const loginCall = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  console.log(res);
  return res
};

export const loginOut = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/profile`, credentials);
  console.log(credentials, "aqui logOut");
  console.log(res);
  return res
};

export const registerNewUserCall = async (credentials) => {
  console.log("hola Register");
  return axios.post(`${API_URL}auth/register`, credentials);
};

export const updateDate = async (dataToSend, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(typeof(dataToSend),dataToSend,"token",token, "yo soy updateDate") 
  const res = await axios.put(`${API_URL}dates/changeDate`,dataToSend, config)
  return res
}

export const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.put(`${API_URL}users/profile`, profileData, config)
  console.log(res, "yo soy updateProfile")
  return res
}


//Admin calls

export const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}users/user/${id}`, config)
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


export const deleteAppointmentId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("yo soy deleteProfile")
  return axios.delete(`${API_URL}dates/deleteDate/${id}`, config)
}

export const bringAllUsers = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.get(`${API_URL}users/allUsers?limit=50?pages=10`, config /*headers*/)
}

export const bringAllAppointment = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.get(`${API_URL}/dates`, config /*headers*/)

}

export const bringAppointment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.get(`${API_URL}users/dates/${id}`, config)
};

export const bringAllJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}jobs/job`, config)
}

export const bringAllArtist = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}users/artists`, config)
}
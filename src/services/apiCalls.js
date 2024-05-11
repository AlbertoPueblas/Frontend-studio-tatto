import axios from "axios";

//--------------------------------------------

const API_URL = "http://localhost:3000/api/"

// Users calls
export const appointmentCreate = async(appCreate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.post(`${API_URL}dates/appointment`,appCreate, config);
  return res
}

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}users`, /*headers*/)
  
  return res.data.results
  
};

export const bringAppointment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.get(`${API_URL}users/dates/${id}`, config)
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

export const deleteMeDate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.delete(`${API_URL}dates/deleteDate${id}`,data, config)
}
export const loginCall = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  return res
};

export const loginOut = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/profile`, credentials);
  return res
};

export const registerNewUserCall = async (credentials) => {
  return axios.post(`${API_URL}auth/register`, credentials);
};

export const updateDate = async (dataToSend, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
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
  return res
}


//Admin calls
export const bringAllAppointment = async (token,  page = 1, limit = 9) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  return axios.get(`${API_URL}/dates?page=${page}&limit=${limit}`, config /*headers*/)
  
}

export const bringAllArtist = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}users/artists`, config)
}

export const bringAllJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}jobs/job`, config)
}



export const bringAllUsers = async (token, page = 1, limit = 15) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}users/allUsers?page=${page}&limit=${limit}`, config);
};

export const deleteAppointmentId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.delete(`${API_URL}dates/deleteDate/${id}`, config)
}

export const deleteUserId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.delete(`${API_URL}users/profile/${id}`, config)
}

export const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get(`${API_URL}users/user/${id}`, config)
}


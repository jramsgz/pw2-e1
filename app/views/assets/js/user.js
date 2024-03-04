const USER_API_URL = "http://localhost:8080/api/user/";

const getMe = () => {
  return axios.get(USER_API_URL + "me", { headers: authHeader() }).then((response) => {
    return response.data;
  }).catch((error) => {
    if (error.response.status === 401) {
      logout();
    }
    return null;
  });
};

const updateMe = (username, email) => {
  const user = {
    username: username,
    email: email
  };
  return axios.put(USER_API_URL + "me", user, { headers: authHeader() }).then((response) => {
    return response;
  }).catch((error) => {
    if (error.response.status === 401) {
      logout();
    }
    return null;
  });
}

const listUsers = () => {
  return axios.get(USER_API_URL + "users", { headers: authHeader() }).then((response) => {
    return response.data;
  }).catch((error) => {
    if (error.response.status === 401) {
      logout();
    }
    return null;
  });
};

const updateUser = (id, username, email) => {
  const user = {
    username: username,
    email: email
  };
  return axios.put(USER_API_URL + id, user, { headers: authHeader() }).then((response) => {
    return response;
  }).catch((error) => {
    if (error.response.status === 401) {
      logout();
    }
    return null;
  });
}

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}

const AUTH_API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, confirm_password, roles) => {
    if (username.length < 3) {
        alert("Username must be at least 3 characters long");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }
    
    if (password !== confirm_password) {
        alert("Passwords don't match");
        return;
    }
    return axios.post(AUTH_API_URL + "signup", {
        username,
        email,
        password,
        roles,
    });
};

const login = (username, password) => {
  return axios
    .post(AUTH_API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

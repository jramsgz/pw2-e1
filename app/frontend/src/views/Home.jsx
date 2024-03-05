import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [user, setUser] = useState('');
  const token = useSelector((state) => state.auth.user.accessToken);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    axios
    .get(import.meta.env.VITE_API_URL + "/user/me", {
      headers: {
        'X-Access-Token': `${token}`,
      },
    })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
        navigate("/login");
      });
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <div className="container main">
        <div className="content">
          <h3 className="text-center signin-text mb-3">App</h3>
          {user ? (
            <div id="userLogged">
              <p className="text-center">
                You are logged in as {user.username}.
              </p>
              <p className="text-center">
                Your roles: {user.roles.map((role) => role).join(", ")}
              </p>
              <div className="text-center">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => editUser(0)}
                >
                  Edit My Profile
                </button>
                <div
                  className="text-center"
                  id="moderator"
                  style={{ display: "none" }}
                >
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Roles</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="usersTable"></tbody>
                  </table>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" onClick={() => handleLogout()}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="notLogged">
              <p className="text-center">
                You are not logged in. Please login to access the app.
              </p>
              <p className="text-center">
                Available roles: <span id="roles"></span>
              </p>
              <div className="text-center">
                <a href="index.html" className="btn btn-primary">
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="modal fade"
        id="userEditModal"
        tabIndex="-1"
        aria-labelledby="userEditModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form id="userEditForm" onSubmit={true}>
              <div className="modal-header">
                <h5 className="modal-title" id="userEditModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="hidden"
                  className="form-control"
                  id="edit-id"
                  name="id"
                  required
                />
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-username"
                    name="username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="edit-email"
                    name="email"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="editUserBtn"
                >
                  Edit User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

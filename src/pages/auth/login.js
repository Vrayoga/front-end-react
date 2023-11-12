import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { username, password }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/mhs");
        window.location.reload();
      } else {
        console.error("gagal login");
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.error("gagal login : kata sandi atau username salah");
      } else {
        console.error("gagal login : error");
      }
    }
  };
  return (
    <div className="container">
      <h2 className="mt-5">Form LOGIN</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          className="form-control"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleLogin}>
        LOGIN
      </button>
      <p className="mt-2">
        belum punya akun? <a href="/register">daftar</a>{" "}
      </p>
    </div>
  );
}

export default Login;

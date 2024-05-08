import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/scss/AdminLogin.scss";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      navigate("/admin/page");
    }
  }, [navigate]);

  // Login data
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api("POST", "auth/admin", signIn);
      if (res.status === 200) {
        toast(res.data.message, { type: "success" });
        const { adminToken, admin } = res.data;

        localStorage.setItem("adminToken", adminToken);
        console.log(adminToken);
        console.log(admin);

        navigate("/admin/page");
      } else {
        if (res.status === 401) {
          toast("Password does not match", { type: "error" });
        } else {
          toast("Sign-in failed. Please try again.", { type: "error" });
        }
      }
    } catch (error) {
      console.error("Error Signing In:", error);
      toast(error.response.data.message, { type: "error" });
    }
  };
  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {/* {error && <p className="error-message">{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={signIn.username}
            onChange={handleSignIn}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signIn.password}
            onChange={handleSignIn}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;

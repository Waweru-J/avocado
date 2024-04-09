import { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../assets/styles/scss/SignUp.scss";
import { AuthContext } from "../store/AuthProvider";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  //register  data
  const { setToken, setAuthUser } = useContext(AuthContext);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  //login data
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  //register
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  //login
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  //register handler
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api("POST", "auth/signup", signUpData);
      if (res.status === 200) {
        toast(res.data.message, { type: "success" });
        const { token, user } = res.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setAuthUser(user);

        navigate("/");
      } else {
        toast(res.data.message, { type: "error" });
      }
    } catch (error) {
      console.error("Error Registering:", error);
      toast("Error registering. Please try again.", { type: "error" });
    }
  };
  //login handler
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api("POST", "auth/login", signInData);
      if (res.status === 200) {
        toast(res.data.message, { type: "success" });
        const { token, user } = res.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        console.log(token);
        console.log(user);

        setToken(token);
        setAuthUser(user);
        navigate("/");
      } else {
        // Handle other status codes, e.g., 401 Unauthorized
        if (res.status === 401) {
          toast("Pasword do not match", { type: "error" });
        } else {
          toast("Sign-in failed. Please try again.", { type: "error" });
        }
      }
    } catch (error) {
      console.error("Error Signing In:", error);
      toast(error.res.data.message, { type: "error" });
    }
  };

  useEffect(() => {
    const byId = (id) => document.getElementById(id);
    const $signUpButton = byId("signUp");
    const $signInButton = byId("signIn");
    const $holder = byId("holder");

    const handleSignUpClick = () => {
      $holder.classList.add("right-panel-active");
    };

    const handleSignInClick = () => {
      $holder.classList.remove("right-panel-active");
    };

    $signUpButton.addEventListener("click", handleSignUpClick);
    $signInButton.addEventListener("click", handleSignInClick);

    // Cleanup event listeners
    return () => {
      $signUpButton.removeEventListener("click", handleSignUpClick);
      $signInButton.removeEventListener("click", handleSignInClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <Fragment>
      <div className="holder" id="holder">
        <div className="form-holder sign-up-holder">
          <form action="#" onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>
            <div className="social-holder">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <span>Or use your email for registration</span>
            <input
              type="text"
              name="username"
              value={signUpData.username}
              placeholder="Username"
              onChange={handleSignUpChange}
              autoComplete="current-username"
            />
            <input
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="Email"
              onChange={handleSignUpChange}
              autoComplete="current-email"
            />
            <input
              type="phone"
              name="phone"
              value={signUpData.phone}
              placeholder="Phone Number"
              onChange={handleSignUpChange}
              autoComplete="current-phone"
            />
            <input
              type="password"
              name="password"
              value={signUpData.password}
              placeholder="Password"
              onChange={handleSignUpChange}
              autoComplete="current-password"
            />
            <input
              type="password"
              name="cpassword"
              value={signUpData.cpassword}
              placeholder="Confirm Password"
              onChange={handleSignUpChange}
              autoComplete="current-password"
            />
            <button className="btn-change">Sign up</button>
          </form>
        </div>

        <div className="form-holder sign-in-holder">
          <form action="#" onSubmit={handleSignInSubmit}>
            <h1>Sign in</h1>
            <div className="social-holder">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <span>Or use your account</span>
            <input
              type="email"
              name="email"
              value={signInData.email}
              placeholder="email"
              onChange={handleSignInChange}
              autoComplete="current-email"
            />
            <input
              type="password"
              name="password"
              value={signInData.password}
              placeholder="Password"
              onChange={handleSignInChange}
              autoComplete="current-password"
            />
            <a href="#">Forgot your Password</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-holder">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please log in with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign in
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;

import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const navigateTo = useNavigate();
  const [signupResponse, changeSignupResponse] = useState("");
  const [loginResponse, changeLoginResponse] = useState("");

  const [signupEmail, changeSignupEmail] = useState("");
  const [signupPassword, changeSignupPassword] = useState("");

  const [loginEmail, changeLoginEmail] = useState("");
  const [loginPassword, changeLoginPassword] = useState("");

  const onSignupEmailChange = (e) => {
    changeSignupEmail(e.target.value);
  };

  const onSignupPasswordChange = (e) => {
    changeSignupPassword(e.target.value);
  };

  const onLoginEmailChange = (e) => {
    changeLoginEmail(e.target.value);
  };

  const onLoginPasswordChange = (e) => {
    changeLoginPassword(e.target.value);
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    const reqBody = { useremail: signupEmail, password: signupPassword };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(
      "https://totality-backend-hima.onrender.com/signup",
      options
    );
    const result = await response.json();
    changeSignupResponse(`*${result.resMsg}`);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const reqBody = { useremail: loginEmail, password: loginPassword };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(
      "https://totality-backend-hima.onrender.com/login",
      options
    );
    const result = await response.json();
    changeLoginResponse(`${result.resMsg}`);
    const status = result.loginStatus;
    if (status) {
      const { jwtToken } = result;
      //console.log(result.resMsg);
      Cookies.set("jwt_token", jwtToken, { expires: 7 });
      navigateTo("/");
    }
  };

  const renderSignupSection = () => {
    return (
      <form className="signupForm" onSubmit={onSignupSubmit}>
        <div className="signupHeading">
          <h1>Sign Up</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={onSignupEmailChange}
            value={signupEmail}
            type="email"
            placeholder="Enter Email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Password
          </label>
          <input
            onChange={onSignupPasswordChange}
            value={signupPassword}
            placeholder="Enter Password"
            type="password"
            className="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div>
          <p className="resMsg">{signupResponse}</p>
        </div>

        <button type="submit" className="btn btn-outline-dark">
          Sign Up
        </button>
      </form>
    );
  };

  const renderLoginSection = () => {
    return (
      <form className="signupForm" onSubmit={onLoginSubmit}>
        <div className="signupHeading">
          <h1>Sign in</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail3" className="form-label">
            Email address
          </label>
          <input
            onChange={onLoginEmailChange}
            value={loginEmail}
            placeholder="Enter Email"
            type="email"
            className="form-control"
            id="exampleInputEmail3"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword4" className="form-label">
            Password
          </label>
          <input
            onChange={onLoginPasswordChange}
            value={loginPassword}
            placeholder="Enter Password"
            type="password"
            className="form-control"
            id="exampleInputPassword4"
          />
        </div>

        <div>
          <p className="resMsg">{loginResponse}</p>
        </div>

        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    );
  };

  return (
    <div className="loginComponent">
      <div className="loginHeader mobileLogo">
        <img className="loginpageImage" src="/totalityCorpImage.jpg" />
        <h1>Totality Corp</h1>
      </div>
      <div className="actionsSection">
        <div className="signupSection">{renderSignupSection()}</div>
        <div className="loginHeader desktopLogo">
          <img className="loginpageImage" src="/totalityCorpImage.jpg" />
          <h1>Totality Corp</h1>
        </div>
        <div className="loginSection">{renderLoginSection()}</div>
      </div>
    </div>
  );
};

export default Login;

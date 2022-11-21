import React, { useRef, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginMethod, emailSetupMethod } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

import "./Login.css";

const Login = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const state = useSelector((state) => state.auth);
  const InputEmail = useRef();
  const InputPassword = useRef();
  const InputConfirmPassword = useRef();
  const navigate = useNavigate();

  const modeChangeHandler = () => {
    setLogin((prevState) => !prevState);
  };
  const authHandler = async () => {
    setLogin(false);
    let email = InputEmail.current.value;
    let password = InputPassword.current.value;

    if (!login) {
      let confirmPassword = InputConfirmPassword.current.value;
      if (!email || !password || !confirmPassword) {
        alert("please fill the all fields");
        return;
      } else {
        if (password !== confirmPassword) {
          alert("password and confirm password are not matching");
          return;
        }
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgRRuVhnFqbFHhO-ooTeX5zHcfLc5yt78",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            setLogin(true);

            InputConfirmPassword.current.value =
              InputEmail.current.value =
              InputPassword.current.value =
                "";

            navigate("/Verifyemail");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgRRuVhnFqbFHhO-ooTeX5zHcfLc5yt78",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          navigate("/verifyemail");
          localStorage.setItem("email", email);
          localStorage.setItem("token", data.idToken);
          dispatch(loginMethod(data.idToken));
          console.log(email);
          console.log(state);
          dispatch(emailSetupMethod(email));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //   useEffect(() => {
  //     if (localStorage.getItem("email")) {
  //       dispatch(loginMethod(localStorage.getItem("token")));

  //       navigate("/verifyemail");
  //     }
  //   }, []);

  return (
    <div className="container">
      <div className="signup">
        <div className="signup__title">
          <h1>Signup</h1>
        </div>
        <div className="signup__inputs">
          <input
            className="signup__inputs__email"
            placeholder="Email"
            ref={InputEmail}
            type="text"
          />
          <input
            className="signup__inputs__password"
            placeholder="Password"
            ref={InputPassword}
          />
          {!login && (
            <input
              className="signup__inputs__confirmpassword"
              placeholder="Confirm Password"
              ref={InputConfirmPassword}
            />
          )}
          {
            <button onClick={authHandler} className="signup__btn">
              {`${!login ? "SignUp" : "Login"}`}
            </button>
          }
          <NavLink to="/forgotpassword">forgot password</NavLink>
        </div>
      </div>
      <div className="modechange">
        {!login && (
          <button onClick={modeChangeHandler} className="login__btn">
            Have a account?Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import classes from './LoginForm.module.css';

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');


  const BACKEND_BASE_URL = "http://localhost:4000";
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${BACKEND_BASE_URL}/login`, {
      email: enteredEmail,
      password: enteredPassword,
    });
    alert(res.data.message);
    if (res.status === "200") {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (res.data.message === "login successful") {
      localStorage.setItem(
        "dabbawala",
        JSON.stringify(res.data.user)
      );
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage["dabbawala"]) {
      navigate("/");
    }
  }, []);




  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h2>Sign In</h2>
      <div className={classes.formInputControl}>
        <div>
          <input
            type='email'
            value={enteredEmail}
            placeholder='Enter your email address'
            onChange={emailChangeHandler}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Enter your password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
      </div>

      <div>
        <button type='submit' className={classes.submitButton}>Log In</button>
      </div>
      <div>
        <button type="button" className={classes.signupButton} onClick={() => {
          navigate("/Register");
        }}><p>Don't have an account ? Sign up here.</p></button>
      </div>
    </form>);
}

export default LoginForm;






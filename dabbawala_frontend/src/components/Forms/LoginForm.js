import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from './LoginForm.module.css';

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');


  const BACKEND_BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    const entryData = async () => {
      const response = await fetch(
        `${BACKEND_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      if (!response.ok) {
        throw new Error('Invalid Credentials !');
      }
      toast.success('Logged In', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // console.log(response.data.id);
      localStorage.setItem(
        "dabbawala",
        JSON.stringify(enteredEmail));
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log(enteredData);
    };
    entryData().catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    });
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
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <button type="button" className={classes.signupButton} onClick={() => {
          navigate("/Register");
        }}><p>Don't have an account ? Sign up here.</p></button>
      </div>
    </form>);
}

export default LoginForm;






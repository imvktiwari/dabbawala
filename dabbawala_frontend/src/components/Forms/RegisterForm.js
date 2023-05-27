import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


import classes from './RegisterForm.module.css';

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workaddress, setWorkaddress] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [postalcode, setPostalcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const BACKEND_BASE_URL = "http://localhost:4000";
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${BACKEND_BASE_URL}/register`, {
      name: name,
      email: email,
      password: password,
      workaddress: workaddress,
      city: city,
      postalcode: postalcode,
      phone: phoneNumber,
    });
    if (res.status === "200") {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      console.log("Error in sign up");
    }
    console.log(
      `Name: ${name}, Email: ${email}, Password: ${password}, WORK ADDRESS: ${workaddress}, Phone Number: ${phoneNumber},CITY:${city},POSTALCODE:${postalcode}`
    );
  };

  useEffect(() => {
    if (localStorage["dabbawala"]) {
      navigate("/");
    }
  }, []);
  // const emailChangeHandler (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h2>Sign Up</h2>
      <div className={classes.formInputControl}>
        <div>
          <input
            type='name'
            value={name}
            placeholder='Enter your full name'
            onChange={(event) => { setName(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='number'
            value={phoneNumber}
            placeholder='Enter your mobile number'
            onChange={(event) => { setPhoneNumber(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='email'
            value={email}
            placeholder='Enter your email address'
            onChange={(event) => { setEmail(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='text'
            value={workaddress}
            placeholder='Enter your work address'
            onChange={(event) => { setWorkaddress(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='number'
            value={postalcode}
            placeholder='Enter your postal code'
            onChange={(event) => { setPostalcode(event.target.value) }}
          />
        </div>
        <div>
          <input
            type='text'
            disabled={true}
            value={city}
            placeholder='Enter your city'
            onChange={(event) => { setCity(event.target.value) }}
          />
        </div>
      </div>

      <div>
        <button type='submit' className={classes.submitButton}>Register</button>
      </div>
      <div>
        <button type="button" className={classes.signinButton} onClick={() => {
          navigate("/Login");
        }}><p>Already have an account ? Sign in here.</p></button>
      </div>
    </form>);
}

export default LoginForm;






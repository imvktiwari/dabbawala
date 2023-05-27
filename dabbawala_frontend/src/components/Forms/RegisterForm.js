import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import classes from './RegisterForm.module.css';

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workaddress, setWorkaddress] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [postalcode, setPostalcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const BACKEND_BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredData = {
      name: name,
      email: email,
      password: password,
      workaddress: workaddress,
      city: city,
      postalcode: postalcode,
      phone: phoneNumber,
    };
    const entryData = async () => {
      const response = await fetch(
        `${BACKEND_BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      toast.success("Successfully Signed Up !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(enteredData);
    };
    entryData().catch((error) => {
      alert(error.message);
    });
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




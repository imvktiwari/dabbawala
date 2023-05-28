import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import classes from './RegisterForm.module.css';
//NOW USING REACT TO VALIDATE FORM
const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;//For Postal Code
const isEightChars = (value) => value.trim().length >= 8;
const isTenChars = (value) => value.trim().length === 10;
const validateEmail = (email) => {
  const atIndex = email.indexOf('@');
  return atIndex === -1;
}

const LoginForm = () => {

  const notification = (noti) => {
    toast.error(noti, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
    password: true,
    workaddress: true,
    city: true,
    postalCode: true,
    phoneNumber: true,
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const workaddressInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const BACKEND_BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredWorkaddress = workaddressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;


    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredEmailIsValid = !validateEmail(enteredEmail);
    const enteredPasswordIsValid = isEightChars(enteredPassword);
    const enteredWorkaddressIsValid = !isEmpty(enteredWorkaddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    const enteredPhoneNumberIsValid = isTenChars(enteredPhoneNumber);



    setFormInputsValidity(
      {
        name: enteredNameIsValid,
        email: enteredEmailIsValid,
        password: enteredPasswordIsValid,
        workaddress: enteredWorkaddressIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid,
        phoneNumber: enteredPhoneNumberIsValid,
      }
    );

    const formIsValid =
      enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid &&
      enteredWorkaddressIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid && enteredPhoneNumberIsValid;

    if (!formIsValid) {
      return;
    }

    //Send to data base
    const enteredData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      workaddress: enteredWorkaddress,
      city: enteredCity,
      postalcode: enteredPostalCode,
      phonenumber: enteredPhoneNumber,
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
      //ERROR
      if (!response.ok) {
        throw new Error('You are already logged in!');
      }
      //SUCCESS
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      toast.success('Registered!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // console.log(enteredData);
    };


    entryData().catch((error) => {
      toast.error('You are already registered', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      nameInputRef.current.value = '';
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      workaddressInputRef.current.value = '';
      postalCodeInputRef.current.value = '';
      cityInputRef.current.value = '';
      phoneNumberInputRef.current.value = '';

    });

  };

  useEffect(() => {
    if (localStorage["dabbawala"]) {
      navigate("/");
    }
  }, []);

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h2>Sign Up</h2>
      <div className={classes.formInputControl}>
        <div>
          <input
            type='name'
            ref={nameInputRef}
            placeholder='Enter your full name'
          />
          {!formInputsValidity.name && notification("Please enter a valid name!")}

        </div>
        <div>
          <input
            type='number'
            ref={phoneNumberInputRef}
            placeholder='Enter your mobile number'
          />
          {!formInputsValidity.phoneNumber && notification("Please enter a valid phone number!")}
        </div>
        <div>
          <input
            type='email'
            ref={emailInputRef}
            placeholder='Enter your email address'
          />
          {!formInputsValidity.email && notification("Please enter a valid email address!")}
        </div>
        <div>
          <input
            type='password'
            placeholder='Enter your password'
            ref={passwordInputRef}
          />
          {!formInputsValidity.password && notification("Password must be eight characters long!")}
        </div>
        <div>
          <input
            type='text'
            ref={workaddressInputRef}
            placeholder='Enter your work address'
          />
          {!formInputsValidity.workaddress && notification("Please enter a valid work address!")}
        </div>
        <div>
          <input
            type='number'
            ref={postalCodeInputRef}
            placeholder='Enter your postal code'
          />
          {!formInputsValidity.postalCode && notification("Please enter a valid postal code!")}
        </div>
        <div>
          <input
            type='text'
            ref={cityInputRef}
            disabled={true}
            value={"Mumbai"}
            placeholder='Enter your city'
          />
          {!formInputsValidity.city && notification("Please enter a valid city!")}
        </div>
      </div>

      <div>
        <button type='submit' className={classes.submitButton}>Register</button>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <button type="button" className={classes.signinButton} onClick={() => {
          navigate("/Login");
        }}><p>Already have an account ? Sign in here.</p></button>
      </div>
    </form>);
}

export default LoginForm;




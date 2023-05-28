import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GooglepayPayment from '../GooglepayPayment'

import classes from './Checkout.module.css';
//NOW USING REACT TO VALIDATE FORM
const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;//For Postal Code
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [editallowed, setEditallowed] = useState(true);//Edit you information
  const [payment, setPayment] = useState("UPI");
  //Reference setup
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
    workaddress: true,
    city: true,
    postalCode: true,
    phoneNumber: true,
  });

  const nameInputRef = useRef();
  const workaddressInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneNumberInputRef = useRef();



  //Getting Information from localStorage...
  const BACKEND_BASE_URL = "http://localhost:5000";
  const LoggedInEmail = localStorage.getItem("dabbawala");
  const URL = `${BACKEND_BASE_URL}/userinformation/${LoggedInEmail.replace(/['"]+/g, '')}`;//to replace double inverted from email-id.
  useEffect(() => {
    const fetchDetails = async () => {
      // console.log(URL);

      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      // console.log(responseData);
      
      // for (const key in responseData) {
      //   loadedMeals.push({
      //     id: key,
      //     name: responseData[key].name,
      //     description: responseData[key].description,
      //     price: responseData[key].price,
      //   });
      // }


      nameInputRef.current.value = responseData.name;
      workaddressInputRef.current.value = responseData.workaddress;
      postalCodeInputRef.current.value = responseData.postalcode;
      cityInputRef.current.value = responseData.city;
      phoneNumberInputRef.current.value = responseData.phonenumber;




    };

    fetchDetails().catch((error) => {
      alert("rftgyhujk");
    });
  }, []);











  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredWorkaddress = workaddressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;


    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredWorkaddressIsValid = !isEmpty(enteredWorkaddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    const enteredPhoneNumberIsValid = isTenChars(enteredPhoneNumber);

    setFormInputsValidity(
      {
        name: enteredNameIsValid,
        workaddress: enteredWorkaddressIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid,
        phoneNumber: enteredPhoneNumberIsValid,
      }
    );

    const formIsValid =
      enteredNameIsValid &&
      enteredWorkaddressIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid && enteredPhoneNumberIsValid;

    if (!formIsValid) {
      return;
    }
    //What I want to send back to save.state={
    let myCurrentDate = new Date()
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();

    // console.log(`${year}${ }${(month < 10) ? `0${month}` : `${month}`}${ }${date}`);
    // alert(`${year}-${month}-${date}`)
    props.onConfirm({
      date: `${date}-${month}-${year}`,
      payment: payment,
    });
  };

  async function updateHandler() {
    setEditallowed(!editallowed)
    const enteredData = {
      name: nameInputRef.current.value,
      workaddress: workaddressInputRef.current.value,
      city: cityInputRef.current.value,
      postalcode: postalCodeInputRef.current.value,
      phonenumber: phoneNumberInputRef.current.value,
    };

    const response = await fetch(
      `${BACKEND_BASE_URL}/updateuserinformation/${LoggedInEmail.replace(/['"]+/g, '')}`, {
      method: 'PUT',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );
    //SUCCESS
    toast.success('Updated!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid
    }`;
  const numberControlClasses = `${classes.control} ${formInputsValidity.phoneNumber ? '' : classes.invalid
    }`;
  const workaddressControlClasses = `${classes.control} ${formInputsValidity.workaddress ? '' : classes.invalid
    }`;
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid
    }`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid
    }`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={classes.formInputControl}>
        <div className={nameControlClasses}>
          <input
            type='name'
            ref={nameInputRef}
            disabled={editallowed}
            style={{ color: !editallowed ? "black" : "#8a2b06", border: editallowed ? "none" : "" }}
            placeholder='Enter your full name'
          />
          {!formInputsValidity.name && notification("Please enter a valid name!")}
        </div>

        <div className={numberControlClasses}>
          <input
            type='number'
            disabled={editallowed}
            ref={phoneNumberInputRef}
            style={{ color: !editallowed ? "black" : "#8a2b06", border: editallowed ? "none" : "" }}
            placeholder='Enter your mobile number'
          />
          {!formInputsValidity.phoneNumber && notification("Please enter a valid phone number!")}
        </div>
        <div className={workaddressControlClasses}>
          <input
            type='text'
            disabled={editallowed}
            ref={workaddressInputRef}
            style={{ color: !editallowed ? "black" : "#8a2b06", border: editallowed ? "none" : "" }}
            placeholder='Enter your work address'
          />
          {!formInputsValidity.workaddress && notification("Please enter a valid work address!")}
        </div>
        <div className={postalCodeControlClasses}>
          <input
            type='number'
            disabled={editallowed}
            ref={postalCodeInputRef}
            style={{ color: !editallowed ? "black" : "#8a2b06", border: editallowed ? "none" : "" }}
            placeholder='Enter your postal code'
          />
          {!formInputsValidity.postalCode && notification("Please enter a valid postal code!")}
        </div>
        <div className={cityControlClasses}>
          <input
            type='text'
            ref={cityInputRef}
            disabled={true}
            value={"Mumbai"}
            style={{ color: !editallowed ? "black" : "#8a2b06", border: editallowed ? "none" : "" }}
            placeholder='Enter your city'
          />
          {!formInputsValidity.city && notification("Please enter a valid city!")}
        </div>
      </div>
      <button type='button' style={{ visibility: !editallowed ? "hidden" : "visible", border: "none", background: "transparent" }} onClick={() => { setEditallowed(!editallowed) }}>
        Edit your information
      </button>
      <br></br>
      <button type='button' className={classes.actions} style={{ visibility: editallowed ? "hidden" : "visible", color: "white", background: "#8a2b06" }} onClick={updateHandler}>
        Update
      </button>
      <div>
        <label>Method Of Payment   : </label>
        <select value={payment} onChange={(event) => setPayment(event.target.value)}>
          <option value='COD'>Cash on Delivery</option>
          <option value='UPI'>Using Google Pay</option>
        </select>
      </div>
      <br></br>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} >{payment == "COD" ? "Confirm" : <GooglepayPayment></GooglepayPayment>}</button>
        <ToastContainer></ToastContainer>
      </div>
    </form >);
}
export default Checkout;
















// const BACKEND_BASE_URL = "http://localhost:5000";
// const navigate = useNavigate();


  //Send to data base
  // const enteredData = {
  //   name: enteredName,
  //   email: enteredEmail,
  //   password: enteredPassword,
  //   workaddress: enteredWorkaddress,
  //   city: enteredCity,
  //   postalcode: enteredPostalCode,
  //   phone: enteredPhoneNumber,
  // };

  // const entryData = async () => {
  //   const response = await fetch(
  //     `${BACKEND_BASE_URL}/register`, {
  //     method: 'POST',
  //     body: JSON.stringify(enteredData),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   );
  //   //ERROR
  //   if (!response.ok) {
  //     throw new Error('You are already logged in!');
  //   }
  //   //SUCCESS
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 3000);
  //   toast.success('Registered!', {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
    // console.log(enteredData);
//   };


//   entryData().catch((error) => {
//     toast.error('You are already registered', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });

//     nameInputRef.current.value = '';
//     emailInputRef.current.value = '';
//     passwordInputRef.current.value = '';
//     workaddressInputRef.current.value = '';
//     postalCodeInputRef.current.value = '';
//     cityInputRef.current.value = '';
//     phoneNumberInputRef.current.value = '';

//   });

// };

// useEffect(() => {
//   if (localStorage["dabbawala"]) {
//     navigate("/");
//   }
// }, []);


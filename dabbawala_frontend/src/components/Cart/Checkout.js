import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './Checkout.module.css';
//NOW USING REACT TO VALIDATE FORM
const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;//For Postal Code
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [editallowed, setEditallowed] = useState(true);

  const LoggedInEmail = localStorage.getItem("dabbawala");
  
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












    
    props.onConfirm({
      name: enteredName,
      workaddress: enteredWorkaddress,
      city: enteredCity,
      postalcode: enteredPostalCode,
      phone: enteredPhoneNumber,
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

      <div className={classes.actions}>
        <button type='button' style={{ visibility: !editallowed ? "hidden" : "visible" }} onClick={() => { setEditallowed(!editallowed) }}>
          Edit your information
        </button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
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


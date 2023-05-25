import React from "react";
import { Fragment } from 'react';


import classes from './Register.module.css'
import Footer from '../components/Layout/Footer';
import RegisterForm from '../components/Forms/RegisterForm'

const Register = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>मुंबईचा डब्बावाला</h1>
            </header>
            <div className={classes['main-image']}>
                <img src='https://img.redbull.com/images/q_auto,f_auto/redbullcom/2022/8/4/xdrte2pjyp2b0bzciked/dabbawalas-mumbai' alt='A table full of delicious food!' />
            </div>
            <RegisterForm></RegisterForm>
            <Footer></Footer>
        </Fragment>);
}
export default Register;
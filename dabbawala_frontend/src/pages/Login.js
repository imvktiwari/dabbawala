import React from "react";
import { Fragment } from 'react';

import classes from './Login.module.css'
import Footer from '../components/Layout/Footer';
import LoginForm from '../components/Forms/LoginForm'

const Login = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>मुंबईचा डब्बावाला</h1>
            </header>
            <div className={classes['main-image']}>
                <img src='https://c8.alamy.com/zooms/9/74e1c6efe5b84f3ba999fea525f50922/trg0dw.jpg' alt='A table full of delicious food!' />
            </div>
            <LoginForm></LoginForm>
            <Footer></Footer>
        </Fragment>);
}
export default Login;
// https://c8.alamy.com/zooms/9/74e1c6efe5b84f3ba999fea525f50922/trg0dw.jpg
// 'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2022/8/4/gf8s75m6r61a7aowy3jv/dabbawalas-mumbai'
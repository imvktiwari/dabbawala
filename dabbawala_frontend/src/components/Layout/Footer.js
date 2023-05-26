import React, { Fragment } from "react";

import classes from './Footer.module.css'

const Footer = () => {
    return (<Fragment>
        <footer className={classes.footer}>
            <p><b>This website is a heartfelt tribute to the enduring legacy of Mumbai's Dabbawalas,
                whose unwavering commitment and unparalleled efficiency in delivering homemade meals have
                become an iconic symbol of the city's culture and a shining example of exceptional food delivery services worldwide.</b>
            </p>
            <p>
                Mumbai's Dabbawalas are an iconic and highly efficient lunchbox delivery service in the city of Mumbai, India.
                The Dabbawalas are a group of individuals who collect freshly cooked meals from the homes of thousands of office workers and deliver them to their workplaces, ensuring that they receive their meals on time.
                The Dabbawalas operate with remarkable efficiency, delivering thousands of lunchboxes accurately and on time every day.
            </p>
            <p >For more information visit : <a href="https://mumbaidabbawala.in/" style={{ color: "white" }}>Mumbai Dabbawalas</a></p>
        </footer>
    </Fragment>);
}
export default Footer
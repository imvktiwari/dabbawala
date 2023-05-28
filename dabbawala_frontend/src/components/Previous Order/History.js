import React, { useEffect, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './History.module.css';
import HistoryItem from './HistoryItem';


const History = (props) => {

    //Getting Information from localStorage...
    const [previous, setPrevious] = useState([]);

    const BACKEND_BASE_URL = "http://localhost:5000";
    const LoggedInEmail = localStorage.getItem("dabbawala");
    const URL = `${BACKEND_BASE_URL}/orderuserinformation/${LoggedInEmail.replace(/['"]+/g, '')}`;//to replace double inverted from email-id.
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            // console.log(responseData);
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    date: responseData[key].date,
                    payment: responseData[key].payment,
                    ordereditems: responseData[key].ordereditems,
                });
            };
            setPrevious(loadedMeals);
        }
        fetchDetails().catch((error) => {
            alert(error.message);
        });
    }, []);

    const HistoryItems = (
        <ul className={classes['cart-items']}>
            {previous.map((item) => (
                <HistoryItem
                    key={item.id}
                    id={item.id}
                    date={item.date}
                    payment={item.payment}
                    ordereditems={item.ordereditems}
                />
            ))}
        </ul>
    );

    const HistoryModalContent = (
        <React.Fragment>
            {previous.length==0 &&<h2>No records found !</h2>}
            {HistoryItems}
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose} >
            {HistoryModalContent}
        </Modal>
    );
}
export default History
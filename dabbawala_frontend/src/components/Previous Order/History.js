import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './History.module.css';


const History = (props) => {

    const HistoryModalContent = (
        <React.Fragment>
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
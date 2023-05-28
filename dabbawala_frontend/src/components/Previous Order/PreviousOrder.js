// import { useContext, useEffect, useState } from 'react';

// import CartIcon from '../Cart/CartIcon';
// import CartContext from '../../store/cart-context';
import classes from './PreviousOrder.module.css';
const PreviousOrder = (props) => {

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span>मागील ऑर्डर</span>
        </button>
    );
}
export default PreviousOrder;
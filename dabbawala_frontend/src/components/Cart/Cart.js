import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    const BACKEND_BASE_URL = "http://localhost:5000";
    const LoggedInEmail = localStorage.getItem("dabbawala");
    // const URL = `${BACKEND_BASE_URL}/userinformation/${LoggedInEmail.replace(/['"]+/g, '')}`;//to replace double inverted from email-id.

    const orderedData = {
      email: `${LoggedInEmail.replace(/['"]+/g, '')}`,
      date: userData.date,
      payment: userData.payment,
      ordereditems: cartCtx.items,
    }
    // console.log(orderedItems);
    // console.log(orderedData);
    await fetch(`${BACKEND_BASE_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(orderedData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  let cartOrderedItems;
  if (!isCheckout)
    cartOrderedItems = cartItems;
  else
    cartOrderedItems = ''
  const cartModalContent = (
    <React.Fragment>
      {cartOrderedItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span><span>&#8377;</span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <p>मागणी यशस्वीपणे मिळाली!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose} >
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Meals from '../components/Meals/Meals';
import Cart from '../components/Cart/Cart';
import History from '../components/Previous Order/History'
import CartProvider from '../store/CartProvider';

const Home = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [historyIsShown,setHistoryIsShown]=useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };
    const showHistoryHandler = () => {
        setHistoryIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };
    const hideHistoryHandler = () => {
        setHistoryIsShown(false);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage["dabbawala"]) {
            navigate("/login");
        }
    }, []);

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            {historyIsShown && <History onClose={hideHistoryHandler} />}
            <Header onShowCart={showCartHandler} onShowHistory={showHistoryHandler} />
            <main>
                <Meals />
            </main>
            <Footer></Footer>
        </CartProvider>
    );
}

export default Home;

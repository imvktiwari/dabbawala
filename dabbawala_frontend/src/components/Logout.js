import { useNavigate } from "react-router";

import classes from './Logout.module.css';

const Logout = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem("dabbawala", "");
        navigate("/login");
    }
    return (
        <button className={classes.button} onClick={logoutHandler}>
            <span>बाहेर पडणे</span>
        </button>
    );
};

export default Logout;

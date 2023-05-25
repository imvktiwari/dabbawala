import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src='https://img.redbull.com/images/q_auto,f_auto/redbullcom/2022/8/4/ikl4kaca6ieuy7q7kb4w/dabbawalas-mumbai' alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
// 'https://mumbaidabbawala.in/wp-content/uploads/2020/01/gate-3.gif'
import React from 'react';
import BurgerLogo from '../../assets/Images/27.1 burger-logo.png.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt={'MyBurger'}/>
    </div>
);

export default logo

import React from 'react';
import Aux from '../../hoc/auxillary';
import classes from './Layout.module.css'

const Layout = ( props ) => (
    <Aux>
        <div>Toolbar, Backdrop,  sidedrawer </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
   
);

export default Layout
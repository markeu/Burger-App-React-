import React from 'react';
import Aux from '../../hoc/auxillary'

const Layout = ( props ) => (
    <Aux>
        <div>Toolbar, Backdrop,  sidedrawer </div>
        <main>
            {props.children}
        </main>
    </Aux>
   
);

export default Layout
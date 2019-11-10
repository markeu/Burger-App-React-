import React, { Component } from 'react';
import Aux from '../../hoc/auxillary';

class BurgerBuilder extends Component{
    render(){
        return(
            <Aux>
                <div>Burger</div>
                <div>Builder controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;
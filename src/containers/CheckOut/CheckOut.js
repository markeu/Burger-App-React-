import React, { Component } from 'react';
import checkoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export class CheckOut extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 2,
            cheese: 1,
            bacon: 2
        }
    }
  render() {
    return (
      <div>
        <checkoutSummary ingredients={this.state.ingredients}/>
      </div>
    )
  }
}

export default CheckOut

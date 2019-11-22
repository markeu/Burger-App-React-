import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 2,
            cheese: 1,
            bacon: 2
        }
    }

    componentDidMount(){
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for (const params in query.entries()) {
        ingredients[params[0]] = +params[1]
      }
      this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data')
    }
  render() {
    return (
      <div>
        <CheckoutSummary 
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}/>
      </div>
    )
  }
}

export default Checkout;

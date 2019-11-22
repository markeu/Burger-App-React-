import React, { Component } from 'react';
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinners/Spinners';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
              name: 'Uche Uzochukwu Mark',
              address: {
                street:'Lugbe Abuja',
                country: 'Nigeria',
                zipcode: 90023,
              },
              email: 'Uche@gmail.com',
          },
          deliveryMethod: 'fastest'
      }

      axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

  render() {
      let form =    
    <form>
      <input className={classes.input} type='text' name='name' placeholder='Your Name' />
      <input className={classes.input} type='email' name='email' placeholder='Your Mail' />
      <input className={classes.input} type='text' name='Street' placeholder='Street' />
      <input className={classes.input} type='text' name='Postal' placeholder='Postal Code' />
      <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
    </form> 

    if( this.state.loading ){
      form =  <Spinner />
    }
    return (
      <div className={classes.ContactData}>
          <h4>Please enter your data!</h4>
          {form}
      </div>
    )
  }
}

export default ContactData

import React, { Component } from 'react';
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinners/Spinners';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    requirred: true
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    requirred: true
                }
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    requirred: true
                }
                
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    requirred: true
                }
                
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue:'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}]
                },
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
      }

      axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    };

    inputChangeHandler = ( event, inputIdentifier ) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({
            orderForm: updatedOrderForm
        });
    };

  render() {
      const formElementArray = [];
      for(let key in this.state.orderForm){
        formElementArray.push({
            id: key,
            config: this.state.orderForm[key]
        })
      }

      let form =    
    <form onSubmit={this.orderHandler}>
      {formElementArray.map(formElement => (
          <Input 
                 key={formElement.id}
                 elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig}
                 value={formElement.config.value}
                 changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
      ))}
      <Button btnType='Success'>ORDER</Button>
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

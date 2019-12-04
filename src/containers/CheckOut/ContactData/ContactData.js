import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                value: '',
                validation: {
                    requirred: true
                },
                valid: false,
                touched: false
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
                },
                valid: false,
                touched: false
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
                },
                valid: false,
                touched: false
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    requirred: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
                
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
                },
                valid: false,
                touched: false
                
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue:'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: '',
                valid: true,
                validation: {}
            },
        },
        formIsValid: false,
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
          ingredients: this.props.ings,
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

    checkValidity( value, rules){
        let isValid = true;
        if( rules.requirred ){
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength && isValid;
        }

        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    inputChangeHandler = ( event, inputIdentifier ) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedOrderForm[inputIdentifier] = updatedElement;
        updatedElement.touched = true;
        
        let formIsValid = true;

        for( let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
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
                 invalid={!formElement.config.valid}
                 touched={formElement.config.touched}
                 shouldValidate={formElement.config.validation}
                 changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
      ))}
      <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);

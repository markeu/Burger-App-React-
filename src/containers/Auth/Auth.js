import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

 class Auth extends Component {
     state = {
         controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    requirred: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    requirred: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            
         }
     };
  render() {

    const formElementArray = [];
    for(let key in this.state.orderForm){
      formElementArray.push({
          id: key,
          config: this.state.orderForm[key]
      })
    }

    const form = formElementArray.map(formElement => (
        <Input />
    ))
    return (
      <div>
        <form>

        </form>
      </div>
    )
  }
};

export default Auth;

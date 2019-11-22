import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinners from '../../components/UI/Spinners/Spinners';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICE = {
    cheese: 0.3,
    bacon: 0.7,
    meat: 1.6,
    salad: 0.6
}
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://my-burger-project-eb398.firebaseio.com/ingredients.json')
                .then(res => {
                    this.setState({ingredients: res.data})
                })
                .catch(error => {
                    this.setState({error: true})
                })
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el)=> {
                        return sum + el
                    }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientsHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    };

    removeIngredientsHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseHandlerClosed = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
    //   this.setState({loading: true})
    //   const order = {
    //       ingredients: this.state.ingredients,
    //       price: this.state.totalPrice,
    //       customer: {
    //           name: 'Uche Uzochukwu Mark',
    //           address: {
    //             street:'Lugbe Abuja',
    //             country: 'Nigeria',
    //             zipcode: 90023,
    //           },
    //           email: 'Uche@gmail.com',
    //       },
    //       deliveryMethod: 'fastest'
    //   }
    //   axios.post('/orders.json', order)
    //         .then(res => {
    //             this.setState({loading: false, purchasing: false})
    //         })
    //         .catch(error => {
    //             this.setState({loading: false, purchasing: false})
    //         })
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString

        })
    } 

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>ingredients cannot be loaded!</p> : <Spinners />

        if( this.state.ingredients ){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingredientsAdded={this.addIngredientsHandler}
                            ingredientsRemoved={this.removeIngredientsHandler} 
                            disabledInfo={disabledInfo}
                            purchasable={this.state.purchasable}
                            clicked={this.purchaseHandler}
                            price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseHandlerClosed}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>
                    
            if (this.state.loading){
                orderSummary = <Spinners />
            }

        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandlerClosed}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
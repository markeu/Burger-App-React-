import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxillary/auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinners from '../../components/UI/Spinners/Spinners';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredients()       
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el)=> {
                        return sum + el
                    }, 0);
                return sum > 0
    }

    // addIngredientsHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // };

    // removeIngredientsHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return ;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseHandlerClosed = (  ) => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    } 

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.props.error ? <p>ingredients cannot be loaded!</p> : <Spinners />

        if( this.props.ings ){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                        <BuildControls
                            ingredientsAdded={this.props.onIngredientsAdded}
                            ingredientsRemoved={this.props.onIngredientsRemoved} 
                            disabledInfo={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            clicked={this.purchaseHandler}
                            price={this.props.price}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.props.price}
                purchaseCancelled={this.purchaseHandlerClosed}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (igName) => dispatch(actions.addIngredients(igName)),
        onIngredientsRemoved: (igName) => dispatch(actions.removeIngredients(igName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
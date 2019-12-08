import * as actionTypes from '../actions/actionTypes';

const intialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4,
};

const INGREDIENTS_PRICE = {
    cheese: 0.3,
    bacon: 0.7,
    meat: 1.6,
    salad: 0.6
}

const reducer = (state = intialState, action) => {
    switch( action.type) {
        case actionTypes.ADD_INGREDIENT: 
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        default:
            return state;
    }

}

export default reducer;
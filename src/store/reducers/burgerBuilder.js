import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICE = {
    cheese: 0.3,
    bacon: 0.7,
    meat: 1.6,
    salad: 0.6
}

const addIngredients = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {  ingredients:updateIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]}
    return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    const updateIngredientz = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updateIngredien = updateObject(state.ingredients, updateIngredientz);
    const updatedStated = {  ingredients:updateIngredien,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]}
    return updateObject(state, updatedStated);
};

const setIngredients = (state, action) => {
    return updateObject(state,  
        { ingredients: action.ingredients,
        totalPrice: 4,
        error: false} );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state,  {error: true} )
}

const reducer = (state = intialState, action) => {
    switch( action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDEINTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }

}

export default reducer;

     // {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            // }
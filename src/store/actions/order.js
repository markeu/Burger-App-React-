import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    }
};

export const purchaseBurgerFail = ( error ) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(res => {
           console.log(res.data);
           dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch( error => {
            dispatch(purchaseBurgerFail( error ))
        })
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: order
    }
}

export const fetchOrderFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('orders.json')
        .then(res => {
            const fetchedOrders = []
            for (const key in res.data) {
               fetchedOrders.push({
                   ...res.data[key],
                   id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err => {
            dispatch(fetchOrderFail(err))
        });
    }
}
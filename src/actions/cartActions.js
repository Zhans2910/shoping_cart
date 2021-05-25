import {ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART} from '../types';

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let inCart = false;
    cartItems.forEach(element => {
        if (element._id === product._id){
            inCart = true;
            element.count++;
        }
    });
    if (!inCart)
        cartItems.push({...product,count: 1});

    dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: {cartItems: cartItems}
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const removeFromCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice().filter((element) => element._id !== product._id);

    dispatch({
        type: REMOVE_PRODUCT_FROM_CART,
        payload: {cartItems: cartItems}
    });
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
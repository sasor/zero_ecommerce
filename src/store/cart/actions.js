import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (productToCart) => (dispatch, getState) => {
    const items = getState().cart.cartItems.slice();
    let inCart = false;
    items.forEach(item => {
        if (item._id === productToCart._id) {
            item.count++;
            inCart = true;
        }
    });
    if (!inCart) {
        items.push({ ...productToCart, count: 1 })
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems: items
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
}

export const removeFromCart = (productToRemove) => (dispatch, getState) => {
    const items = getState().cart.cartItems.slice().filter(item => item._id !== productToRemove._id);
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            cartItems: items
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
}
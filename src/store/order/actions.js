import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types";

export const createOrder = order => async dispatch => {
    const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    const data = await res.json();
    console.log(data);
    dispatch({
        type: CREATE_ORDER,
        payload: data.payload
    });
    localStorage.clear("cartItems");
    dispatch({
        type: CLEAR_CART
    });
}

export const clearOrder = _ => dispatch => {
    dispatch({
        type: CLEAR_ORDER
    });
}
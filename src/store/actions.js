import { FETCH_PRODUCTS } from "./types";

export const fetchProducts = _ => async dispatch => {
    const res = await fetch(`/api/products`);
    const data = await res.json();
    const { payload } = data;
    dispatch({
        type: FETCH_PRODUCTS,
        payload: payload.products
    })
}
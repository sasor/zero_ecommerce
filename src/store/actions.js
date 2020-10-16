import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "./types";

export const fetchProducts = _ => async dispatch => {
    const res = await fetch(`/api/products`);
    const data = await res.json();
    const { payload } = data;
    dispatch({
        type: FETCH_PRODUCTS,
        payload: payload.products
    })
}

export const filterProducts = (products, size) => dispatch => {
    const items = size === "" ? products : products.filter(product => product.availableSizes.includes(size));
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size,
            items
        }
    });
}

export const sortProducts = (filteredProducts, sort) => dispatch => {
    let compareF = null;
    switch (sort) {
        case "lowest": {
            compareF = (a, b) => a.price - b.price;
            break;
        }
        case "highest": {
            compareF = (a, b) => b.price - a.price;
            break;
        }
        default: {
            compareF = (a, b) => a._id - b._id;
        }
    }
    const items = filteredProducts.slice().sort(compareF);
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort,
            items
        }
    });
}
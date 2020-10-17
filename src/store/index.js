import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { cartReducer } from "./cart/reducer";
import { orderReducer } from "./order/reducer";

const reducers = combineReducers({
    products: reducer,
    cart: cartReducer,
    order: orderReducer
});

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
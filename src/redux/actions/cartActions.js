import axios from 'axios';
import { returnErrors } from './errorActions';
import ACTIONS from "./index";

export const getCart = (res) => {
    return {
            type: ACTIONS.GET_CART,
            payload: res.data
        }
}

export const addToCart = (res) => {
     return {
            type: ACTIONS.ADD_TO_CART,
            payload: res.data
        }
}

export const deleteFromCart = (res) => {
    return {
            type: ACTIONS.DELETE_FROM_CART,
            payload: res.data
        }
}

export const setCartLoading = () => {
    return{
        type: ACTIONS.CART_LOADING
    }
}

export const clearCart = () => {
    return {
        type: ACTIONS.CLEAR_CART
    }
}
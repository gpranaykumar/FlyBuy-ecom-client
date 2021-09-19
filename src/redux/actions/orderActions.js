import axios from 'axios';
import { returnErrors } from './errorActions';
import ACTIONS from '.';

export const getOrders = (res) => {
    return {
            type: ACTIONS.GET_ORDERS,
            payload: res.data
        }
}

export const checkout = (res) =>{
        return {
            type: ACTIONS.CHECKOUT,
            payload: res.data
        }
}

export const setOrdersLoading = () => {
    return{
        type: ACTIONS.ORDERS_LOADING
    }
}
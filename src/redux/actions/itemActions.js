import axios from "axios";
import ACTIONS from "./index";
import { returnErrors } from './errorActions';

export const getItems = (res) => {
    return {
        type: ACTIONS.GET_ITEMS,
        payload: res.data
    }
}

export const addItem = (res) => {
    return {
            type: ACTIONS.ADD_ITEM,
            payload: res.data
        }
}

export const deleteItem = (id) => {
        return {
            type: ACTIONS.DELETE_ITEM,
            payload: id
        }
}

export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: ACTIONS.UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return{
        type: ACTIONS.ITEMS_LOADING
    }
}
import axios from "axios";
import ACTIONS from "./index";

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    
    /* const res = await axios.get('/user/infor',{
        headers: {Authorization: token}
    }) */
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: token,
            'Content-Type': 'application/json' },
        credentials: 'include',
        body: null
      };
    const res = await fetch('/user/infor', requestOptions).then( (response) => { return response.json()})
    return res
}

export const dispatchGetUser =  (res) => {
    return {
        type: ACTIONS.GET_USER,
        /* payload: {
            user: res.data,
            isAdmin: res.data.role
        } */
        payload: {
            user: res,
            isAdmin: res.role
        }
    }
}
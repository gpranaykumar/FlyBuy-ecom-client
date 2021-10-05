import axios from "axios";
import ACTIONS from "./index";

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    
    const res = await axios.get('/user/infor',{
        headers: {Authorization: token}
    })
    
    return res
}

export const dispatchGetUser =  (res) => {
    /* console.log("dispatch user: ",res)
    console.log("dispatch user: ",res.user) */
    return {
        type: ACTIONS.GET_USER,
        /* payload: {
            user: res.data,
            isAdmin: res.data.role
        } */
        payload: {
            user: res.user,
            isAdmin: res?.user?.role
        }
    }
}
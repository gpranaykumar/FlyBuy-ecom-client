import axios from "axios";
import ACTIONS from "./index";

export const fetchAllUsers = async (token) => {
    
    /* const res = await axios.get('/user/all_infor',{
        headers: {Authorization: token}

    }) */

    const requestOptions = {
        method: 'GET',
        headers: { Authorization: token,
            'Content-Type': 'application/json' },
        credentials: 'include',
        body: null
      };

      const res = await fetch('/user/all_infor', requestOptions)
                    .then( (response) => { 
                        console.log("all_infor-users: ")
                        console.log(response)
                        return response.json()})
                    .catch(err => console.log("all_infor-users error: "+err))
    
    return res
}

export const dispatchGetAllUsers =  (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}
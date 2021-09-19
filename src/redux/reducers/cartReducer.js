import ACTIONS from "../actions";
const initialState = {
    cart: null,
    loading: false
}

const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }

        case ACTIONS.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }

        case ACTIONS.DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }

        case ACTIONS.CART_LOADING:
            return {
                ...state, 
                loading: true
            }

        case ACTIONS.CLEAR_CART:
            return {
                ...state,
                cart: null,
                loading: false
            }

        default:
            return state;
    }
}

export default cartReducer
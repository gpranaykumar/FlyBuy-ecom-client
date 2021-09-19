import ACTIONS from "../actions";
const initialState = {
    orders: [],
    loading: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ORDERS:
            return{
                ...state,
                orders: action.payload,
                loading: false
            }

        case ACTIONS.CHECKOUT:
            return{
                ...state,
                orders: [action.payload, ...state.orders]
            }

        case ACTIONS.ORDERS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export default orderReducer
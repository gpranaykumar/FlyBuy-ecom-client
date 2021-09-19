import ACTIONS from "../actions";
const initialState = {
    items: [],
    loading: false
}

const itemReducer = (state=initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            }
        
        case ACTIONS.ADD_ITEM:
            return{
                ...state,
                items: [action.payload, ...state.items]
            }
        
        case ACTIONS.DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id!==action.payload)                
            };
        
        case ACTIONS.UPDATE_ITEM:
            const { id, data } = action.payload;
            return{
                ...state,
                items: state.items.map((item) => {
                    if(item._id===id){
                        return item = data;
                    }
                    return null;
                })
            }

        case ACTIONS.ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export default itemReducer
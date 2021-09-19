import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import item from './itemReducer'
import order from './orderReducer'
import cart from './cartReducer'
import error from './errorReducer'
export default combineReducers({
    auth,
    token,
    users,
    item,
    cart,
    order,
    error
})
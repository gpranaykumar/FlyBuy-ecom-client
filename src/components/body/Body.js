import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ActivationEmail from './auth/ActivationEmail'
import Login from './auth/Login'
import Register from './auth/Register'
import {useSelector} from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile/Profile'
import EditUser from './profile/EditUser'
import Shop from './shop/Shop'
import Cart from './cart/Cart'
import Orders from './orders/Orders'
import Home from './home/Home'
import AddItem from './shop/Item/AddItem'
import EditItem from './shop/Item/EditItem'
import DeleteItem from './shop/Item/DeleteItem'
import ProductDetail from './shop/ProductDetail'
import Checkout from './checkout/Checkout'
import Recipt from './orders/Recipt'
function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route exact path="/" component={ Home} />
                <Route exact path="/login" component={isLogged ? NotFound : Login} />
                <Route exact path="/register" component={isLogged ? NotFound : Register} />
                <Route exact path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} />
                <Route exact path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} />

                <Route exact path="/user/activate/:activation_token" component={ActivationEmail} />

                <Route exact path="/profile" component={isLogged ? Profile:NotFound} />
                <Route exact path="/edit_user/:id" component={isAdmin ? EditUser:NotFound} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/shop/item_details/:id" component={ProductDetail} />
                <Route exact path="/cart" component={isLogged ? Cart:NotFound} />
                <Route exact path="/orders" component={isLogged ? Orders:NotFound} />
                <Route exact path="/checkout" component={isLogged ? Checkout:NotFound} />
                <Route exact path="/order/recipt/:id" component={isLogged ? Recipt:NotFound} />
                
                <Route exact path="/shop/items/add_item" component={isAdmin ? AddItem:NotFound} />
                <Route exact path="/shop/edit_item/:id" component={isAdmin ? EditItem:NotFound} />
                <Route exact path="/shop/delete_item/:id" component={isAdmin ? DeleteItem:NotFound} />
                
                <Route  component={NotFound} />
            </Switch>
            
        </section>
    )
}

export default Body

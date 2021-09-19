import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Spinner, Button} from 'reactstrap';
import axios from 'axios'
import { deleteFromCart, getCart, setCartLoading } from '../../../redux/actions/cartActions'
import { returnErrors } from '../../../redux/actions/errorActions'
import ACTIONS from '../../../redux/actions'
import { Link, useHistory} from 'react-router-dom';
import './Cart.css'
import Checkout from '../checkout/Checkout';

function Cart() {
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const [cartLoaded, setCartLoaded]= useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const cartFunc = () => {
        const getCartCall = async () => {
            try {
                const id = auth.user._id
                const res = await axios.get(`/api/cart/${id}`)
                dispatch(getCart(res))
                if(id!== undefined){
                    setCartLoaded(false)
                }else{
                    setCartLoaded(true)
                }
            } catch (err) {
                try{
                    dispatch(returnErrors(err.response.data, err.response.status))
                }catch(e){
                    console.log("Cart-page-getCartCall-err: "+e);
                }
            }
        }
        if(!cartLoaded){
            if( auth.user._id!==undefined && cart.cart === null ){
                dispatch(setCartLoading())
                getCartCall()
              }
        }
        
    }
    useEffect(() => {
        cartFunc()
    },[auth.isLogged, cartLoaded])

    const cartImg = {
        "width" : "125px",
        "borderRadius": "100%"
    }
    const deleteItem = async(userId, itemId) =>{
        try {
            const res = await axios.delete(`/api/cart/${userId}/${itemId}`)
            dispatch(deleteFromCart(res))
            return alert("Item deleted from cart")
        } catch (err){
            try {
                dispatch(returnErrors(err.response.data, err.response.status))
            } catch (error) {
                console.log(error)
            }
            return alert("something went wrong..")
        }
    }
    const displayCart=()=> {
        if(cart.cart!==null && cart.cart!==""){
            return (
            cart.cart.items.map((item)=> (
                <div className="row m-1" key={item.productId}>
                <Card className="mb-4 gpk-product-scale py-3">
                    <div className="col px-2">
                        <div className="text-end">
                            <Button className="btn-danger" onClick={() => {deleteItem(auth.user._id,item.productId)}}>
                                <i className="fas fa-times"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="col-11">
                        <div className="row">
                        <Link to={`/shop/item_details/${item.productId}`} className="text-dark text-decoration-none 
                            d-flex flex-column flex-sm-row align-items-center 
                            text-center" >
                            <div className="col-12 col-sm-3">
                                <img src={item.img} alt='product_img' style={cartImg} />
                            </div>
                            <div className="col-12 col-sm-5">
                                <h5>{item.name}</h5>
                            </div>
                            <div className="col-12 col-sm-2">
                                <h6>Quantity:{item.quantity}</h6>
                            </div>
                            <div className="col-12 col-sm-2">
                                <h4>Rs. {item.price}</h4>
                            </div>
                        </Link>
                        </div>
                    </div>
                    
                </Card>
                </div>
            ))
            
            )
        }else{
            /*return (
                <div className="text-center"><h1>Cart is Empty</h1></div>
            )*/
            return null
        }
    }
    const loadingfun = () =>{
        return (
            <div className="d-flex justify-content-center align-items-center" style={{"minHeight":"87vh"}}>
                    <Spinner color="dark" />
                    <h1>Loading...</h1>
            </div>
        )
    }
    return (
            <div className="Container ">
                <h1 className="text-center">Cart </h1>
                {  cart.loading ? 
                    loadingfun()
                    :
                    <div className="m-3 ">
                            { displayCart()}
                    {cart.cart !== ""? <>
                        <h1 className="text-end">Total Bill: { cart.cart? cart.cart.bill: 0 }</h1>
                        <div className="d-flex justify-content-end">
                           <Button onClick={() => history.push('/checkout')}>Checkout</Button>
                        </div>
                        </>
                    :<h1 className="text-center text-info">Empty</h1>}
                    </div>
                
                }
            </div>
    )
}

export default Cart

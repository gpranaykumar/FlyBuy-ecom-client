import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Spinner, Button} from 'reactstrap';
import { Link, useHistory} from 'react-router-dom';
import { returnErrors } from '../../../redux/actions/errorActions';
import { getOrders, setOrdersLoading } from '../../../redux/actions/orderActions';
import axios from 'axios';
import moment from 'moment'
function Orders() {
    const order = useSelector(state => state.order)
    const auth = useSelector(state => state.auth)
    const [orderLoaded, setOrderLoaded]= useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const orderFunc = () => {
        const getOrderCall = async () => {
            try {
                const userId = auth.user._id
                const res = await axios.get(`/api/order/${userId}`)
                dispatch(getOrders(res))
                if(userId!== undefined){
                    setOrderLoaded(false)
                }else{
                    setOrderLoaded(true)
                }
            } catch (err) {
                try{
                    dispatch(returnErrors(err.response.data, err.response.status))
                }catch(e){
                    console.log("Cart-page-getCartCall-err: "+e);
                }
            }
        }

        if(!orderLoaded){
            if( /* auth.user._id!==undefined &&  */ order.orders === null || order.orders.length === 0 ){
                dispatch(setOrdersLoading())
                getOrderCall()
              }
        }
        
    }
    useEffect(() => {
        orderFunc()
    },[auth.isLogged, orderLoaded])

    const orderImg = {
        "width" : "125px",
        "borderRadius": "100%"
    }
    const displayOrders=()=> {
        if(order.orders!==null && order.orders.length !== 0){
            return (
                order.orders.map((order)=> (
                <div className="row m-1" key={order._id}>
                <Card className="mb-4 py-3">
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h6>Order Id: {order._id}</h6>
                            <h6>Ordered: {moment(order.date_added).format('LLL')}</h6>
                        </div>
                        {order.paid?
                        <Button className="btn btn-info mb-2 " onClick={()=> history.push(`/order/recipt/${order._id}`)}>Recipt</Button>
                        :
                        <h6 className="text-danger"> Payment Failed</h6>
                        }
                    </div>
                    <div className="col-12">
                        {order.items.map((item)=> (
                            <Card className="mb-4 gpk-product-scale py-3" key={item.productId}>
                            <div className="row">
                                <Link to={`/shop/item_details/${item.productId}`} className="text-dark text-decoration-none 
                                    d-flex flex-column flex-sm-row align-items-center 
                                    text-center" >
                                    <div className="col-12 col-sm-3">
                                        <img src={item.img} alt='product_img' style={orderImg} />
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
                            </Card>
                        ))}
                        <h3 className="text-end">Total: {order.bill}</h3>
                    </div>
                    
                </Card>
                </div>
            ))
            
            )
        }else{
            return (
                <div className="text-center text-info"><h1>Empty</h1></div>
            )
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
                <h1 className="text-center">My Orders </h1>
                {  order.loading ? 
                    loadingfun()
                    :
                    <div className="m-3 ">
                            { displayOrders()}
                    </div>
                }
            </div>
    )
}

export default Orders

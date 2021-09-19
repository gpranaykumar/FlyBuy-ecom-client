import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useParams} from 'react-router-dom';
import './Recipt.css'
import moment from 'moment'
function Recipt() {
    const order = useSelector(state => state.order)
    const auth = useSelector(state => state.auth)
    const {id}= useParams()
    const [orderR, setOrderR]= useState()
    const  history = useHistory()
    console.log(id)
    const OrderFilterFunc = () => {
        if(order.orders && orderR=== undefined ){
            order.orders.map((order) => {
                if(order._id === id){
                    return setOrderR(order)
                }
            })
        }
        console.log(orderR)
    }
    const printReceipt = () =>{
        window.print()
    }

    const printItems = () => {
        var i=1;
        return (orderR.items.map((item) => {
              return (<tr key={item.productId}>
                <th scope="row">{i++}</th>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity*item.price}</td>
              </tr>)
        }))
    }
    const displayRecipt = () => {
        if( orderR === undefined ){
            return (<div>
                <hr/>
                <h1 className="text-center text-danger">Invalid Order Id</h1>
            </div>

            )
        }
        return (
            <div className="card p-3">
                <div className="printme">
                    <div className="d-flex justify-content-end" >
                        <button  onClick={() => {window.print()}} className="btn btn-info"><i className="fa fa-print"></i>Print</button>
                    </div>
                    <hr/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 style={{"color":"#0d6efd"}}>FlyBuy</h3>
                    <h6 className="text-end">Order Id: {orderR._id}</h6>
                </div>
                <hr/>
                <p>To:</p>
                <h5>{auth.user.name.toUpperCase()}</h5>
                <p>{orderR.address?orderR.address:null}</p>
                <p>Email: {auth.user.email}</p>
                <p>{orderR.mobileNo?
                    "Phone: +91 "+ orderR.mobileNo
                    :null}</p>
                <p> Ordered: {moment(orderR.date_added).format('LLL') }</p>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                        {printItems()}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <strong className="px-2">Subtotal: </strong>
                    <strong>{orderR.bill}</strong>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <h1 className="text-center">Recipt</h1>
            <div className="row">
                {OrderFilterFunc()}
                {displayRecipt()}
            </div>
        </div>
    )
}

export default Recipt

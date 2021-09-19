import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {Button} from 'reactstrap'
import axios from 'axios';
import {clearCart} from '../../../redux/actions/cartActions'

const initialState = {
  address:'',
  mobileNo:''
}

function Checkout() {
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const user = auth.user._id

    const [data, setData] = useState(initialState)
    const {address, mobileNo} = data

    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value})
    }


    const razorPayPaymentHandler = async() => {
        
          const orderUrl = `/api/order/${user}`;

          const response = await axios.post(orderUrl,{address, mobileNo});
          const { data } = response;
          console.log("App -> razorPayPaymentHandler -> data", data)
        
        const options = {
          key: '',
          name: "FlyBuy",
          description: "Thank you for shopping.",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `/api/order/capture/${paymentId}`;
             const amount = cart.cart? cart.cart.bill: 0
             const captureResponse = await axios.post(url, {amount})
             console.log(captureResponse)
             const successObj = JSON.parse(captureResponse.data)
             const captured = successObj.captured;
             console.log("App -> razorPayPaymentHandler -> captured", successObj)
             if(captured){
              
                console.log('success')
                const url = `/api/order/success/${data.id}`;
                const success = async () =>{
                  try{
                    const res = await axios.post(url, {userId: user })
                  }catch(err){
                    console.log("success error : ")
                    console.log(err)
                  }
                } 
                success()
                dispatch(clearCart())

                return history.push('/orders');
             }else{
               console.log("failure")
              return history.push('/orders');
             }
             
            } catch (err) {
              console.log("handler error: ")
              console.log(err);
                return (
                    <div>
                        <h1>Something went wrong </h1>
                    </div>
                )
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    return (
        <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="form-group mb-2">
                      <label className="form-label" htmlFor="address">Address</label>
                      <input type="text" name="address" id="address" value={address}
                      placeholder="Enter delivery address" onChange={handleChange} className="form-control form-control-lg"/>
                  </div>

                  <div className="form-group mb-2">
                      <label className="form-label" htmlFor="mobileNo">Mobile Number</label>
                      <input type="tel" name="mobileNo" pattern="[0-9]{10}" id="mobileNo" value={mobileNo}
                      placeholder="Enter Mobile Number" onChange={handleChange}  className="form-control form-control-lg" />
                  </div>
              </div>
            </div>
            <Button onClick={() => razorPayPaymentHandler()}>Proceed</Button>
        </div>
    )
}

export default Checkout

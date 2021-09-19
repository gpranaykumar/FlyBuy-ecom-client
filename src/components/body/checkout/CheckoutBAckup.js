import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {checkout} from '../../../redux/actions/orderActions'
import { useDispatch } from 'react-redux';
import { returnErrors } from '../../../redux/actions/errorActions';
const STRIPE_PUBLISHABLE = 'pk_test_51JaMzsSA29K3GzqdqKsMKtEzRX2S4pwcaFP3zhVzp0Wz07sJWEn2Su6AWGnMnYQdnMZ502whvT5Vv8yPU1DWXX3600l7j5EyBO';





const Checkout = ( {amount, user} ) => {
    const dispatch = useDispatch()

    const onToken = (user) => token => {
        checkoutFun(user, token.id);
    }

    const checkoutFun = async (id,source) =>{
    
        try {
            const res = await axios.post(`/api/order/${id}`, {source})
            dispatch(checkout(res))
        } catch (err) {
             try {
                dispatch(returnErrors(err.response.data, err.response.status))
             } catch (error) {
                 console.log(error)
             }
             alert ("Something went wrong")
        }
    }

    console.log("checkout")
    console.log("Rs."+amount)
    console.log("UserId"+user)
    console.log(amount*100)
    return (
        <StripeCheckout
        amount={amount*100}
        token={onToken(user)}
        currency='INR'
        stripeKey={STRIPE_PUBLISHABLE}
        />
    )
    
}
export default Checkout;
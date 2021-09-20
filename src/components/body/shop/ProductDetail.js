import React,{useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Button,Row} from 'reactstrap';
import './Shop.css'
import { addToCart } from '../../../redux/actions/cartActions';
import { returnErrors } from '../../../redux/actions/errorActions';
import axios from 'axios';
import { getItems, setItemsLoading } from '../../../redux/actions/itemActions';
function ProductDetail() {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const items = useSelector(state => state.item)
    const auth = useSelector(state => state.auth)
    const  item1  = items.items.filter((i) => {
        if(i._id === id){
            return i;
        }
    })[0];
    const onAddToCart = async (id, productId,quantity) => {
        console.log("AddToCart clicked")
        try {
            const res = await axios.post(`/api/cart/${id}`, {productId, quantity})
            dispatch(addToCart(res))
            return alert ('Item added to Cart');
        } catch (err) {
            //dispatch(returnErrors(err.response.data, err.response.status))
            console.log("ProductDetail AddToCart err: ");
            return console.log(err);
        }

    }
    const productImgStyle =  {
        "max-height":"250px"
    }
    const itemsCall = () => {
        try{
          console.log("items api request")
          dispatch(setItemsLoading())
          const itemFun = async () =>{
              const res = await axios.get('/api/items')
              dispatch(getItems(res));
          }
          itemFun()
      }catch(err){
          try{
              dispatch(returnErrors(err.response.data, err.response.status))
          }catch(e){
              console.log("ProductDetail-page:item call-: "+e);
          }
      }
      }
    useEffect(() => {
        itemsCall()
    },[!(auth.isLogged)])
    const itemDetails=()=>{
        if(item1!==undefined){
            return (
                <Row>   
                    
                    <h1 className="text-center solid mb-5">Product Details</h1>
                    <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                        <img src={item1.img} alt="product img" style={productImgStyle}/>
                    </div>
                    <div className="col-12 col-md-6" >
                        <h2>{item1.title}</h2>
                        <p>category: {item1.category}</p>
                        <h5 className="my-3">Product Id: {item1._id}</h5>
                        <h2>₹{item1.price}</h2>
                        
                        <h5 className="text-secondary mt-3">Description</h5>
                        <p>{item1.description}</p>
                        {auth.isLogged? 
                            <Button
                                color="info"
                                size="sm"
                                className="gpk-btn"
                                onClick={()=> onAddToCart(auth.user._id, item1._id, 1)}
                                >Add To Cart</Button> :
                                null}
                    </div>
                </Row>
            )
        }else{
            //history.push('/404')
            <h1>Item Not Found</h1>
        }
    }
    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-start">
                <button onClick={() => history.goBack()} className="go_back">
                    <i className="fas fa-long-arrow-alt-left"></i> Go Back
                </button>
            </div>
            {itemDetails()}
        </div>
    )
}

export default ProductDetail

import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getItems, setItemsLoading } from '../../../redux/actions/itemActions'
import { returnErrors } from '../../../redux/actions/errorActions'
import {Spinner, Card, CardText, CardBody, CardTitle, CardSubtitle, Button, CardImg, CardGroup, CardColumns, CardDeck} from 'reactstrap'
import './Shop.css'
import ACTIONS from '../../../redux/actions'
import { addToCart } from '../../../redux/actions/cartActions'
function Shop() {
    const [itemLength, setItemLength] = useState(0)
    const [filteredItems, setFilteredItems] = useState([])
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const item = useSelector(state => state.item)
    const auth = useSelector(state => state.auth)

    

    useEffect(()=>{
        setFilteredItems(
            item.items.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase())
            })
        )
    },[search])
    const onAddToCart = async (id, productId,quantity) => {
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
    const onDeleteItem = async (id) => {
        try {
            const res = await axios.delete(`/api/items/${id}`)
            dispatch(deleteItem(id))
        } catch (err){
            dispatch(returnErrors(err.response.data, err.response.status))
            console.log("onDeleteItem Error: ")
            return console.log(err);
        }
    }
    const printItems = () => {
            return (filteredItems.map((item) => {
                return (
                    <div className="col-12 col-md-4 " key={item._id}>
                            <Card className="mb-4 gpk-product-scale gpk-product-minHeight">
                                <CardBody>
                                <Link to={`/shop/item_details/${item._id}`} className="text-dark text-decoration-none" >
                                <div className="d-flex justify-content-center">
                                    <img className="w-75" src={item.img} alt="Card image cap" />
                                </div>
                                    <CardTitle tag="h5">{item.title}</CardTitle>
                                    <CardSubtitle tag="h6" >category:{item.category}</CardSubtitle>
                                </Link>
                                    <div className="row">
                                        <div className="col">
                                            <CardText tag="h4">₹ {item.price}</CardText>
                                        </div>
                                    </div>
                                    <CardText className="mt-2" >
                                    {auth.isLogged?
                                        <Button
                                            color="info"
                                            size="sm"
                                            className="gpk-btn m-1"
                                            onClick={() => {
                                                onAddToCart(auth.user._id, item._id, 1)
                                            }}
                                            >Add To Cart</Button> 
                                        : null }
                                    {auth.isAdmin? <>
                                    <Link to={`/shop/edit_item/${item._id}`} className="text-decoration-none" >
                                    <Button
                                        color="warning"
                                        size="sm"
                                        className="gpk-btn m-1"
                                        >Edit Product</Button> 
                                    </Link>
                                    
                                    <Button
                                    color="danger"
                                    size="sm"
                                    className="gpk-btn m-1"
                                    onClick={() => {
                                        onDeleteItem(item._id)
                                    }}
                                    >Delete Product</Button>
                                        </>
                                    : null }
                                    </CardText>
                                </CardBody>
                                
                            </Card>
                            </div>
                )
            }))
    }
    return (
        <div className="container-fluid">
            { item.loading?
                <div className="d-flex justify-content-center align-items-center" style={{"minHeight":"87vh"}}>
                    <Spinner color="dark" />
                </div>
                :
                <>
                    <div className="row pt-5 d-flex justify-content-center">
                        <div className="col-10 col-md-6">
                        <input type="text" placeholder="Search" onChange={ e => setSearch(e.target.value) }
                            className="form-control form-control-lg" />
                            
                        </div>
                        {auth.isAdmin? <div className="row m-3 text-center">
                        <div className="col-12">
                            <Button color="danger" size="sm"className="gpk-btn ">
                                <Link to="/shop/items/add_item" className="gpk-link">Add Product</Link>
                            </Button> 
                            </div>
                            </div> : null}
                    </div>
                    <div className="row pt-5 d-flex justify-content-center">
                        {printItems()}
                    </div>
                </>
                
            }
            
        </div>
    )
}

export default Shop

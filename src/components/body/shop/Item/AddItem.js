import React ,{useState, us}from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Spinner } from 'reactstrap'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification/Notification'
import { addItem } from '../../../../redux/actions/itemActions'
const initialState = {
    title: '',
    description: '',
    category: '',
    price: '',
    img: '',
    err: '',
    success: ''
}

function AddItem() {
    const [itemImg, setItemImg] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const history = useHistory()
    const changeItemImg = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setItemImg(res.data.url)
            setData({...data, img:itemImg })
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const productImgStyle =  {
        "max-height":"250px"
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const {title, description, category, price} = data
            const img = itemImg
            console.log("submit data:")
            console.log(title, description, category, price, img)
            const res = await axios.post('/api/items', {title, description, category, price, img})
            dispatch(addItem(res))
            setData({...data, err:'', success: 'Item Added Successfully'})
        } catch (error) {
            data.err &&
            setData({...data, err: error.response.data.msg, success: ''})
        }
    }
    console.log(data)
    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-5">
                <h2 className="text-center">Add Item</h2>
                <div className="col-12 col-md-6">
                    {data.err && showErrMsg(data.err) }
                    {data.success && showSuccessMsg(data.success)}
                        <div className="ItemImg d-flex justify-content-center">
                            {!data.err && !data.success && loading && <Spinner color="dark" /> }
                            <img src={itemImg ? itemImg : null} alt="" style={productImgStyle}/>
                        </div>
                    <div className="pb-3">
                        <label className="form-label" htmlFor="file" >Product Image</label>
                        <input type="file" name="file" id="file_up" onChange={changeItemImg} className="btn btn-sm" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="pb-3">
                            <label className="form-label" htmlFor="title" >Title</label>
                            <input type="text" placeholder="Enter product title" id="title" value={data.title}
                                name="title" className="form-control form-control-lg" onChange={handleChange} />
                        </div>
                        <div className="pb-3">
                            <label className="form-label" htmlFor="description" >Description</label>
                            <input type="text" placeholder="Enter product description" id="description" value={data.description}
                                name="description" className="form-control form-control-lg" onChange={handleChange} />
                        </div>
                        <div className="pb-3">
                            <label className="form-label" htmlFor="category" >Category</label>
                            <input type="text" placeholder="Enter product category" id="category" value={data.category}
                                name="category" className="form-control form-control-lg" onChange={handleChange} />
                        </div>
                        <div className="pb-3">
                            <label className="form-label" htmlFor="price" >Price(₹)</label>
                            <input type="text" placeholder="Enter product price" id="price" value={data.price}
                                name="price" className="form-control form-control-lg" onChange={handleChange} />
                        </div>
                        <div className="pt-1 mb-4" >
                                <button  className="btn btn-info btn-lg btn-block" type="submit">Add </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddItem

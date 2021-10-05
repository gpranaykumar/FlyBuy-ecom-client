import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { dispatchLogin } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import login_img from '../../../assets/img/e-com.jpg'
const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}
function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value } = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post('/user/login', {email, password},)
            setUser({...user, err: '', success: res.data.msg})
            //console.log(res)
            localStorage.setItem('refreshtoken',res.data.refreshtoken)
            localStorage.setItem('firstlogin',true)
            dispatch(dispatchLogin())
            history.push("/")

        }catch(err){
            /* console.log("err")
            console.log(err.response) */
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''}) 
        }
    }
    return (
        <>
        <section className="vh-100">
        <div className="container-fluid">
        
                <div className="row justify-content-center">
                    <div className="d-flex align-items-center ">
                        <div className="col-12 col-md-6 text-black px-5 pt-5">
                            <div >
                            
                        <form onSubmit={handleSubmit} style={{"maxWidth": "23rem"}}>
                        <h3 className="fw-normal mb-5">Login</h3>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                            <div className="pb-3">
                                <label className="form-label" htmlFor="email" >Email Address</label>
                                <input type="text" placeholder="Enter email address" id="email"
                                    value={email} name="email" className="form-control form-control-lg" onChange={handleChangeInput} />
                            </div>
                            <div className="pb-3">
                                <label className="form-label" htmlFor="password" >Password</label>
                                <input type="password" placeholder="Enter password" id="password"
                                    value={password} name="password" className="form-control form-control-lg" onChange={handleChangeInput} />
                            </div>
                            <div className="pt-1 mb-4" >
                                <button  className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                            </div>
                            <p className="small mb-2 pb-lg-3 ">
                            <Link to="/forgot_password">Forgot your password?</Link>
                            </p>
                        </form>
                        </div>
                        <p>New Customer?<Link to="/register">Register here</Link></p>
                        </div>
                        <div className="col-md-6 px-0 d-none d-md-block">
                            <img src={login_img} alt="Login" className="w-100 vh-100 login_img"/>
                        </div>
                    </div>
                </div>
        
        </div>
        </section>
    </>
    )
}

export default Login

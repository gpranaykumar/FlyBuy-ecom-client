import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
function Register() {
    const [user, setUser] = useState(initialState)
    const {name, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value } = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})
        if(!isEmail(email))
            return setUser({...user, err: "Invalid email.", success: ''})
        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})
        
        try{
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err:'', success: res.data.msg})

        }catch(err){
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="container-fluid">
             <div className="row justify-content-center">
             <div className="col-12 col-md-6 text-black px-5 pt-3">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center pb-4">Register</h2>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <div className="pb-3">
                        <label className="form-label" htmlFor="name" >Name</label>
                        <input type="text" placeholder="Enter your name" id="name"
                            value={name} name="name" className="form-control form-control-lg" onChange={handleChangeInput} />
                    </div>
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
                    <div className="pb-3">
                        <label className="form-label" htmlFor="cf_password" >Confirm Password</label>
                        <input type="password" placeholder="Enter Confirm password" id="cf_password"
                            value={cf_password} name="cf_password" className="form-control form-control-lg" onChange={handleChangeInput} />
                    </div>
                    <div className="pt-1 mb-3">
                        <button  className="btn btn-info btn-lg btn-block" type="submit">Register</button>
                    </div>
                    <p>Already have an account?<Link to="/login">Login</Link></p>
                </form>
                    
            </div>
            </div>
        </div>
    )
}

export default Register

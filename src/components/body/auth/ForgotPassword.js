import axios from 'axios'
import React, {useState} from 'react'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isEmail } from '../../utils/validation/Validation'

const initialState = {
    email:'',
    err: '',
    success: ''
}
function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput =  e =>{
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const forgotPassword = async() => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid email.', success: ''})
        try{
            const res = await axios.post('/user/forgot', {email})
            return setData({...data, err:'', success: res.data.msg})
        }catch(err){
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center pt-5">
                <div className="col-10 col-md-5">
                    <h2 className="text-center">Forgot Your Password?</h2>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <div className="pb-3 pt-4">
                        <label className="form-label" htmlFor="email">Enter your email address</label>
                        <input type="email" name="email" id="email" value={email} className="form-control form-control-lg"
                            onChange={handleChangeInput} />
                    </div>
                    <button  className="btn btn-info btn-lg btn-block" onClick={forgotPassword}>Verify your email</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

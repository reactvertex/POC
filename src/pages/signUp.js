import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../api/baseurl";

const form_wrapper = {
    backgroundColor: '#17252A',
    height: '100vh'
}
const form = {
    backgroundColor: '#2B7A78'
}
const label = {
    color: '#DEF2F1'
}
const signupText = {
    color: '#DEF2F1',
    textAlign: 'center',
    marginTop: '10px',
}
const signupButton = {
    backgroundColor: "#17252a",
    fontSize: "16px",
    color: '#DEF2F1',
    height: '40px',
    width: '120px',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
}
const spanTag = {
    cursor: 'pointer',
    color: '#17252A',
    fontWeight: 'bold'
}




const SignUp = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [empDetails, setEmpDetails] = useState([{
        userId: '',
        email: '',
        password: '',
        confirmPassword: ''
    }])

    const handleEmpDetails = (e) => {
        setErrorMsg('');
        setEmpDetails({ ...empDetails, [e.target.name]: e.target.value })
    }

    const getSignUp = async () => {
        try {
            setIsLoading(true)
            const reqData = {
                "username": empDetails.userId,
                "email": empDetails.email,
                "role": [
                    "ROLE_USER"
                ],
                "password": empDetails.password
            }
            const { data, status } = await Axios.post(`${BASE_URL}/api/auth/signup`, reqData);
            if (status == 200) {
                setIsLoading(false)
                navigate("/login");
            }
        } catch (error) {
            setIsLoading(false)
            setErrorMsg(error.response.data.message);
        }
    }
    const handleSingUpForm = (e) => {
        e.preventDefault();
        if (empDetails.password == empDetails.confirmPassword) {
            getSignUp()
        } else {
            setErrorMsg('Password does not match')
        }
    }
    const navigate = useNavigate();
    const handleNavigateLogin = () => {
        navigate("/login");
    }
    return (
        <div style={form_wrapper} className={`row p-0 m-0 justify-content-center align-items-center`}>
            <div style={form} className={`col-lg-4 p-3 rounded `}>
                <div className="d-flex justify-content-center">
                    <div
                        className="avatar d-flex justify-content-center align-items-center"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Click to upload profile pic"
                    >
                       <h2 style={label} >Signup</h2>
                    </div>
                </div>
                <form onSubmit={handleSingUpForm} className="">
                    <div className="form-row row">
                        <div className="form-group col-md-12 my-2">
                            <label for="inputEmail4" style={label}>User Id</label>
                            <input
                                placeholder="User Id"
                                name="userId"
                                className="form-control my-2"
                                required
                                pattern="^[A-Za-z0-9]{0,8}$"
                                value={empDetails.userId}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        <div className="form-group col-md-12 my-2">
                            <label for="inputPassword4" style={label} >Email</label>
                            <input
                                placeholder="Emp email"
                                name="email"
                                type='email'
                                className="form-control my-2"
                                required
                                value={empDetails.email}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        <div className="form-group col-md-12 my-2">
                            <label for="inputPassword4" style={label} >Password</label>
                            <input
                                placeholder="Password"
                                name="password"
                                maxlength="15"
                                minLength="3"
                                type='password'
                                className="form-control my-2"
                                required
                                value={empDetails.password}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        <div className="form-group col-md-12 my-2">
                            <label for="inputPassword4" style={label}>Confirm Password </label>
                            <input
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                maxlength="15"
                                minLength="3"
                                type='password'
                                className="form-control my-2"
                                required
                                value={empDetails.confirmPassword}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        {errorMsg && <div style={{ color: '#f5dd42' }}>{errorMsg}</div>}
                    </div>
                    <div className='d-flex justify-content-center pt-4'>
                        <button type="submit"
                            style={signupButton}
                            className={`mx-3`}
                            variant="contained"
                        >{isLoading ? <div class="spinner-border  spinner-border-sm text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> : 'Sign up'}</button>
                    </div>
                    <div style={signupText}>Already have an account ? <span style={spanTag} onClick={() => handleNavigateLogin()} >LogIn</span> </div>
                </form>

            </div>
        </div>

    )
}

export default SignUp;
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { setLocalStorageData } from "../util/localStorageService";
import { BASE_URL } from "../api/baseurl";

const formWrapper = {
    backgroundColor: '#17252A',
    height: '100vh'
}

const loginForm = {
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

const loginButton = {
    backgroundColor: "#17252A",
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


const Login = () => {
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [empDetails, setEmpDetails] = useState([{
        userId: '',
        pass: '',
    }])
    const navigate = useNavigate();
    const handleEmpDetails = (e) => {
        setErrorMsg('')
        setEmpDetails({ ...empDetails, [e.target.name]: e.target.value })
    }
    const getLogin = async () => {
        setIsLoading(true);
        try {
            const reqData = {
                "username": empDetails.userId,
                "password": empDetails.pass
            }
            const { data, status } = await Axios.post(`${BASE_URL}/api/auth/signin`, reqData);
            if (status == 200) {
                setIsLoading(false);
                setLocalStorageData("username", data.username);
                setLocalStorageData("token", data.token);
                setLocalStorageData("id", data.id);
                navigate("/");
            }
        } catch (error) {
            if (error.response.status == 401) {
                setIsLoading(false);
                setErrorMsg('Invalide login Details')
            }
        }
    }
    const handleSingUpForm = (e) => {
        e.preventDefault();
        // getLogin()
    }
    const handleNavigateSignUp = () => {
        navigate("/signup");
    }
    return (
        <div style={formWrapper} className={`row p-0 m-0 justify-content-center align-items-center`}>
            <div style={loginForm} className={`col-lg-4 p-3 rounded`}>
                <div className="d-flex justify-content-center">
                    <div
                        className="avatar d-flex justify-content-center align-items-center"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Click to upload profile pic"
                    >
                        <h2 style={label}>Login</h2>
                    </div>
                </div>
                <form onSubmit={handleSingUpForm}  className="">
                    <div className="form-row row">
                        <div className="form-group col-md-12 my-2">
                            <label for="inputEmail4" style={label}>User Name </label>
                            <input
                                placeholder="User name"
                                name="userId"
                                className="form-control my-2"
                                required
                                pattern="^[A-Za-z0-9]{0,8}$"
                                value={empDetails.userId}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        <div className="form-group col-md-12 my-2">
                            <label for="inputPassword4" style={label}>Password</label>
                            <input
                                placeholder="Password"
                                name="pass"
                                maxlength="15"
                                type='password'
                                className="form-control my-2"
                                minLength="3"
                                required
                                value={empDetails.pass}
                                onChange={(e) => handleEmpDetails(e)}
                            ></input>
                        </div>
                        {errorMsg && <div style={{ color: '#f5dd42' }}>{errorMsg}</div>}
                    </div>
                    <div className='d-flex justify-content-center pt-4'>
                        <button type="submit"
                            variant="contained"
                            style={loginButton}
                            className={`mx-3`}> {isLoading ?
                                <div class="spinner-border spinner-border-sm  text-light" >
                                    <span class="visually-hidden">Loading...</span>
                                 </div>
                                : 'Log in'}</button>
                    </div>
                    <div style={signupText} >Don't have an account? <span style={spanTag} onClick={() => handleNavigateSignUp()}>Sign Up</span> </div>
                </form>
            </div>
        </div>

    )
}

export default Login;
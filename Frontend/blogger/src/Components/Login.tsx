import React, {useEffect, useReducer, useState} from 'react'
import { Alert } from 'react-bootstrap';
import '../Css/Login.css'
import { Blogger } from '../Models/Blogger';
import { useLogonMutation } from '../Services/Login';
import { useNavigate } from 'react-router';

const Login:React.FC<any> = () => {

   const [userName, setName] = useState("");
   const [userPassword, setPassword] = useState("");
   const [Login,  { data, error, isLoading, isSuccess, isError}] = useLogonMutation(); 

    const nav = useNavigate();

    useEffect(() => {
      if (isSuccess)
      {
          if (data.token)
          {
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("storage"));
            nav('/')
          }
      }
    }, [isLoading])

    const usernameFieldChange = (event:any) =>
    {
      setName(event.target.value);
    }

    const passwordFieldChange = (event:any) => {
      setPassword(event.target.value);
    }

    const submit = (event: any) => {
      event.preventDefault();
      let blogger: Blogger ={
        id: 0,
        firstname: '',
        lastname:  '',
        username: userName,
        password: userPassword,
      }
  
      Login(blogger)
      
        
      setPassword("");
    }

    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="username"
                value = {userName}
                onChange={usernameFieldChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value = {userPassword}
                onChange = {passwordFieldChange}
              />
            </div>

            { isSuccess ? (
               <>
                { data.token ? 
                  (
                    <></>
                  ): 
                  (

                    <div className="error">
                      <Alert key="danger" variant="danger">
                        { data.error }
                      </Alert>
                    </div>
                  )}
               </>
              ): null
            }
            
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={submit}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
}

export default Login;
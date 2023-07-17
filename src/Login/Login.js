import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../components/contexts/UserContext';

const Login = () => {

    const [error,setError]=useState(null)
    const {signIn,user}= useContext(Authcontext)
    const navigate=useNavigate()
    const location=useLocation();
    const from= location.state?.from?.pathname || '/';
    const handleSignIn=event=>
    {
        event.preventDefault();
        const form=event.target
        const email=form.email.value
        const password=form.password.value
        if(user.emailVerified !== true)
        {
          setError('Email not varified')
          return;
        }
        
            signIn(email,password)
            .then(result=>
                {
                    const user=result.user
                    console.log(user)
                    form.reset()
                    navigate(from,{replace: true})
        
                })
                .catch(error=>
                    {
                        console.error(error)
                        setError(error.message)
    
                    })
        
                
        
    }

  
    return (
        <div className='form-container'>
            <h1 className='form-title'>Login!</h1>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='' required></input>
                </div>

                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='' required></input>
                </div>

                <input className='btn-submit' type='submit' value='Login'></input>

            </form>
            <p>New to E-trade?<Link to='/signup'>Create a account</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Login;
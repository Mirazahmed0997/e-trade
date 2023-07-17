import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { Authcontext } from '../components/contexts/UserContext';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../firebase/Firebase.init';

const auth=getAuth(app)

const SignUp = () => {
    const[error,setError]=useState(null)
    const [success,setSuccess]=useState(false);
    const {createUser,emailVarification}=useContext(Authcontext)

    const handleSubmit=event=>
    {
        event.preventDefault();
        const form=event.target
        const email=form.email.value
        const password=form.password.value
        const confirm=form.confirm.value
        if(password.length<6)
        {
            setError('Password should be atleast 6 characters')
            return
        }
        if(password!==confirm)
        {
            setError("Password didn't match")
            return;
        }

        createUser(email,password)
        .then(result=>
            {
                const user=result.user;
                console.log(user)
                form.reset();
                varifyEmail()
                setSuccess(true)
                return;
            })
            .catch(error=>
                {
                    console.log(error)
                    setError(error.message)
                })

        const varifyEmail=()=>
            {
                
              sendEmailVerification(auth.currentUser)
             .then(result=>
                     {
                          alert('Please varify your email')
                     })
            }       

    }
    return (
        <form onSubmit={handleSubmit} className='form-container'>
        <h1 className='form-title'>Sign up</h1>
        <div >
            <div className="form-control">
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='' required></input>
            </div>

            <div className="form-control">
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='' required></input>
            </div>
            <div className="form-control">
                <label htmlFor='confirm'>Confirm password</label>
                <input type='password' name='confirm' id='' required></input>
            </div>

            <input className='btn-submit' type='submit' value='sign up'></input>

        </div>
        <p>Already have an account?<Link to='/login'>Login</Link></p>
        {
            success?<small className='text-success'>User successfully created</small>:
            <small className='text-error'>{error}</small> 
          }    </form>
    );
};

export default SignUp;
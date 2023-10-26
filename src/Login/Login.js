import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../components/contexts/UserContext';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {

    const [error, setError] = useState(null)
    const { signIn, user, GoogleSignIn } = useContext(Authcontext)
    const googleProvider =new GoogleAuthProvider()
    const navigate = useNavigate()
    const location = useLocation();
    const [success, setSuccess] = useState(false)
    const from = location.state?.from?.pathname || '/';
    const handleSignIn = event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value


        signIn(email, password)
            .then(result => {
                const user = result.user
                setSuccess(true)
                console.log(user)
                form.reset();
                if (user.emailVerified) {
                    navigate(from, { replace: true })
                }
                else {
                    alert('Email is not verified')
                }

            })
            .catch(error => {
                console.error(error)
                setError(error.message)

            })



    }

    const handleGoogleSignIn = () => {
        GoogleSignIn(googleProvider)
            .then(result => {
                const user = result.user
                navigate(from, { replace: true })


            })

            .catch(error => console.error(error))
    }


    return (
        <div>

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
                <p>Don't have E-trade trade account?<Link className='font-bold text-red-600' to='/signup'>Create a account</Link></p>
                <p className='text-error mb-2'>{error}</p>
                <div className='px-24 '>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline' >CONTINUE WITH GOOGLE</button>
                </div>

            </div>
            <div className="divider">OR</div>
        </div>

    );
};

export default Login;
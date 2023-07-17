import React, { useContext } from 'react';
import logo from '../../images/letter-e-icon-png-9.png'
import './Header.css'
import { Link } from 'react-router-dom';
import { Authcontext } from '../contexts/UserContext';


const Header = () => {
    const {user,logOut}=useContext(Authcontext)
    return (
       <nav className='header'>
            <img src={logo} alt=''></img>  
            <div >
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>   
                <span className='span'>{user?.email}</span>
                { user?.uid?
                  <button className='btn-logout' onClick={logOut}>Logout</button>:<><Link to='/login'>Login</Link> 
                  <Link to='/signup'>Sign up</Link>
                  </>
                }
            </div>      
       </nav>
    );
};

export default Header;
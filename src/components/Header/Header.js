import React, { useContext, useEffect, useRef, useState } from 'react';
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
              <Link to='/home'>Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">Profile</Link>   
                <span className='span'>{user?.displayName}</span>
                { user?.uid?
                  <button className='btn-logout' onClick={logOut}>Logout</button>:<><Link to='/login'>Login</Link> 
                  
                  </>
                }
            </div>      
       </nav>
    );
};

export default Header;
import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Product = ({product,handleAddToCart}) => {
    const {img,name,price,seller,ratings}=product
   
    return (
        <div className='product'>
            <div className='info'>
            <img src={img} alt=''></img>
            <p className='product-name'>{name}</p>
            <p>Price:{price}</p>
            <p>Seller : {seller}</p>
            <p>Ratings : {ratings} Stars</p>
            </div>
            <button  className='cart-btn' onClick={()=>handleAddToCart(product)}><p>Add To Cart</p><FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></button>
            
            
        </div>
    );
};

export default Product;
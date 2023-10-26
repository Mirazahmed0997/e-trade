import React, { Children } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Cart = (props) => {
    const { cart,clearCart } = props;
    // console.log(cart);
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;
    return (
     <div>
           <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total price: {total} TK</p>
            <p>Total Shipping: {shipping} TK</p>
            <p>Tax: {tax} <small>(10%)</small></p>
            <h5>Grand Total: {grandTotal.toFixed(2)} TK</h5><br></br>
            <button className='btn' onClick={clearCart}><p>Clear Cart</p><FontAwesomeIcon className='clr-icon' icon={faTrashCan}></FontAwesomeIcon></button>
        </div>

     </div>
    );
};

export default Cart;
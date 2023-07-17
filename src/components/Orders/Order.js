import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './Order.css';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import OrdersItem from '../OrdersItem/OrdersItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const {products,initialCart}=useLoaderData()
    const [cart,setCart]=useState(initialCart)
  
    
    const handleremoveItem=(id)=>
    {
        const remainingProducts=cart.filter(product=>product.id!==id)
        setCart(remainingProducts)
        removeFromDb(id)
    }
    const clearCart=()=>{
        setCart([]);
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product=><OrdersItem key={product.id} product={product} handleremoveItem={handleremoveItem}
                    ></OrdersItem>)
                }
                {
                    cart.length===0 && <h2>No order item . Please <Link to='/'>Shop more</Link></h2>
                }
            </div>
            <div className='cart-container'>
                    <div>
                    <Cart clearCart={clearCart} cart={cart}>
                    </Cart>
                    </div>  
                    <div>
                    <Link to='/proceed' >
                    <button className='proceed-btn'>Proceed Shiping</button>
                    </Link> 
                    </div>       
            </div>

        </div>
       
    );
};

export default Order;
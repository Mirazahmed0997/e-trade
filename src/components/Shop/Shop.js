import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';





const Shop = () => {
    const {products,count}=useLoaderData();
    const [cart, setCart] = useState([]);
    const [page,setPage]=useState(0)
    const [size,setSize]=useState(10)
    const pages =Math.ceil(count/size);
    
    const clearCart=()=>{
        setCart([]);
        deleteShoppingCart()
    }



    useEffect( () =>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
                

                
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart}  cart={cart}>
                <Link to='/orders' >
                    <button className='proceed-btn'>Review Orders</button>
                </Link> 
                </Cart>
            </div>
            <div className='pagination'>
                <p>Currently selected page : {page}</p>

                {
                    [...Array(pages).keys()].map(number=><button onClick={()=>setPage(number)} 
                        className={page==number&&'selected'}
                        key={number}>
                            {number}
                    </button>)
                }

            </div>
        </div>
    );
};

export default Shop;
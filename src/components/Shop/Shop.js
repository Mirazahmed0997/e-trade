import React, { useEffect, useRef, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';





const Shop = () => {
    // const {products,count}=useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const searchRef = useRef();
    const [search, setSearch] = useState('')
    const pages = Math.ceil(count / size);

    useEffect(() => {
        const url = `http://localhost:5000/products?search=${search}&page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                {
                    setCount(data.count);
                    setProducts(data.products);
                }
            })
    }, [page, size,search])

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }



    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        const ids = Object.keys(storedCart)

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);

            })
        // 
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    const handleSearch = () => {
        setSearch(searchRef.current.value)
        console.log(searchRef.current.value)
    }

    return (

        <div>
            <div className='text-center p-2'>
                <input ref={searchRef} className='text-black bg-base-300'placeholder='Search by name' type="text" /><button onClick={handleSearch} className='btn-primary px-2'>Search</button>
            </div>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }



                </div>
                <div className="cart-container">
                    <Cart clearCart={clearCart} cart={cart}>
                        <Link to='/orders' >
                            <button className='proceed-btn'>Review Orders</button>
                        </Link>
                    </Cart>
                </div>
                <div className='pagination'>

                    {
                        [...Array(pages).keys()].map(number => <button onClick={() => setPage(number)}
                            className={page == number && 'selected'}
                            key={number}>
                            {number + 1}
                        </button>)
                    }
                    <select onClick={event => setSize(event.target.value)} name="" id="">
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value=""></option>
                    </select>

                </div>
            </div>
        </div>
    );
};

export default Shop;
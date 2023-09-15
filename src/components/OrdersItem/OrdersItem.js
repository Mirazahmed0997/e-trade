import React from 'react';
import './OrdersItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faMultiply } from '@fortawesome/free-solid-svg-icons';

const OrdersItem = ({product,handleremoveItem}) => {
    const {_id,name,price,quantity,img,shipping}=product
    return (
        <div className='orderItem'>
            <div>
                <img src={img}alt=''/>
            </div>
            <div className='order-detail-container'>
                <div className='order-detail'>
                    <p>{name}</p>
                    <p><small>Price : {price}</small></p>
                    <p><small>Shipping : {shipping}</small></p>
                    <p><small>Quantity :{quantity}</small></p>
                </div>
                <div className='dlt-btn'>
                    <button onClick={()=>handleremoveItem(_id)} className='dlt-btn'>
                        <FontAwesomeIcon className='dlt-icon' icon={faMultiply}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrdersItem;
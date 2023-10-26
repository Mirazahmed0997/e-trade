import React from 'react';
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpeg'
import img4 from '../../images/img4.jpg'
import { Link } from 'react-router-dom';



const Home = () => {
    return (
        
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Buy your best </h1>
              <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <Link to='/shop'><button className="btn btn-primary">Lets Buy here</button></Link>
            </div>
          </div>
</div>
        
    );
};

export default Home;
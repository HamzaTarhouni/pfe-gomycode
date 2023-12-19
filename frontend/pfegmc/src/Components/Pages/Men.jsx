// Product.js

import React, { useEffect, useState } from 'react';
import './Men.css';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:5000/api/product')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter products by category "Men"
  const menProducts = products.filter(product => product.category === 'Men');

  const addToCart = productId => {
    // Implement your logic to add the product to the cart
    console.log(`Product added to cart: ${productId}`);
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
     <div>
     <Slider {...sliderSettings}>
        <div className="slider-item">
        <img
              src="https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=600&fbclid=IwAR03qdldtnKB6eOAAPqRAxHNiQnZq41dtjVMKo2Gu2B0Kq8I6IlIBgPCsoQ"
              alt=""
              className="slider-image"
            />
        </div>
      </Slider>
      <div className="product-container">
        {menProducts.map(product => (
          <div key={product._id} className="container_product_card">
            <div className="product_card">
              <div className="top_card">
                {/* img, price */}
                <img src={product.images[0].url} alt={product.title} className="product_image" />
                <span className="product_price">${product.price}</span>
              </div>
              <div className="bottom_card">
                {/* name, desc, cta */}
                <div className="product_name">
                  <h6>{product.brand}</h6>
                  <h4>{product.title}</h4>
                </div>
                
                <button
                  type="button"
                  className="cta_add_to_cart"
                  //onClick={() => addToCart(product._id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Product;

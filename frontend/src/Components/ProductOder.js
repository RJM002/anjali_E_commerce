import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "./util";
import './Product.css';

const ProductList = ({ cart, setCart, product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      handleSuccess(`${product.name} has been added to your cart`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const viewProductDetail = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <div className="unique-product-list-container">
      <h1 className="unique-product-list-title">Product List</h1>
      <div className="unique-product-list">
        {product.map(item => (
          <div key={item._id} className="unique-product-card">
            <img src='https://via.placeholder.com/150' alt={item.name} className="unique-product-image" />
            <h2 className="unique-product-name">{item.name}</h2>
            <p className="unique-product-price">Price: <strong>${item.price}</strong></p>
            <p className="unique-product-description">Description: {item.description}</p>
            <div className="unique-product-buttons">
              <button onClick={() => viewProductDetail(item._id)} className="unique-view-button">View Product</button>
              <button onClick={() => handleAddToCart(item)} className="unique-add-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart">
        <button className="unique-view-cart-button">View Cart</button>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default ProductList;

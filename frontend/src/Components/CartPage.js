import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";

const CartPage = ({ cart, setCart }) => {
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    handleSuccess(`Your item has been removed from the cart successfully`);
  };

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    handleSuccess('Your order is placed and cart is now empty... Happy shopping!');
    setCart([]);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item._id} className="cart-item">
              <h2 className="cart-item-name">{item.name}</h2>
              <img src='https://via.placeholder.com/150' alt={item.name} />
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemoveFromCart(item._id)} className="remove-button">Remove</button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="checkout-section">
          <h3 className="total-cost">Total Cost: ${totalCost.toFixed(2)}</h3>
          <div className="checkout-buttons">
            <button onClick={handleCheckout} className="cart-button checkout-button">Checkout</button>
            <Link to="/">
              <button className="cart-button continue-shopping-button">Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CartPage;

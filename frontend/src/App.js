import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Home from "./Components/Home";
import RefreshHandler from "./Components/RefreshHandler";
import ChatBot from "./Components/ChatBot";
import Navigation from "./Components/Navbar";
import ProductOrder from "./Components/ProductOder";
import CartPage from "./Components/CartPage";
import ContactPage from "./Components/ContactPage";
import ProductDetail from "./Components/ProductDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/products');
        console.log('checking product response', response);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const shouldShowNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      {shouldShowNavbar && (
        <Navigation 
          product={product} 
          setProduct={setProduct} 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/home" 
          element={
            <Home 
              product={product} 
              setProduct={setProduct} 
              isAuthenticated={isAuthenticated} 
              setIsAuthenticated={setIsAuthenticated} 
            />
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProductOrder 
              product={product} 
              setProduct={setProduct} 
              cart={cart} 
              setCart={setCart} 
            />
          } 
        />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      {shouldShowNavbar && (
      <ChatBot />
      )}
    </div>
  );
}

export default App;
// src/components/GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log('Google response:', response);

    if (response.error) {
      console.error("Login failed:", response.error);
      return;
    }

    // Check if tokenId is available
    const tokenId = response.tokenId;
    if (!tokenId) {
      console.error("Token ID is undefined. Login might not have completed successfully.");
      return;
    }

    console.log("Token ID:", tokenId);

    // Send tokenId to your backend for verification
    fetch('http://localhost:8080/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: tokenId }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('User data:', data);
        // Handle user data (store in state, redirect, etc.)
      })
      .catch(err => console.error('Error sending token to backend:', err));
  };

  return (
    <GoogleLogin
      clientId='198989575360-tjcqirn7d7bnqvv29uf4la09kvngrifd.apps.googleusercontent.com'
      buttonText="Login with Google"
      onSuccess={responseGoogle} // Updated handler names
      onFailure={responseGoogle} // Updated handler names
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;

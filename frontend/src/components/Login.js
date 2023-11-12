import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import './Login.css';

const Login = () => {
  const { dispatch } = useAuthContext();

  const handleButtonClick = () => {
    window.location.href = "http://localhost:4000/auth";
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");


      const response = await fetch("http://localhost:4000/auth/googleUser", {
        credentials: 'include',
        mode: 'cors'
      });

      console.log("fetched user:");

  
      const json = await response.json();
      console.log(json);
  
      if (response.ok) {
        dispatch({ type: "LOGIN", payload: json })
      }
    };
  
    fetchUser();
  }, [dispatch]);
  

return (
  <div className="login-container">
    <div>
      <img className="login-image" src='/gallery.jpg'></img>
    </div>
    <div className="login-content">
      <h1>Welcome to Caraoke</h1>
      <img 
        onClick={handleButtonClick} 
        src="/gauth.jpeg" 
        alt="google login" 
        className="hoverable-image" 
      />
    </div>
  </div>
);
}

export default Login;
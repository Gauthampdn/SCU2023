import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";



const Login = () => {

  const { dispatch } = useAuthContext()

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
    <div className="login">


        <img onClick={handleButtonClick} src="/glog.png" alt="google login" className="hoverable-image" />
        
    </div>
  );
}

export default Login;
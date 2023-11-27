import React from "react";
import { useLocation } from "react-router-dom";


  
export function Home() {
    const location = useLocation();
    const token = location.state?.token;
  return (
    <>
      <p>Hello</p>
      <p>Welcome Hoooo this is your token: {token} </p>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
}

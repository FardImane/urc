import React from "react";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

  
export function Home() {
    const location = useLocation();
    const token = location.state?.token;
  return (
    <>
     <nav>
      {/* <Link to="/logout">Logout</Link> */}
    </nav>
      <p>Hello</p>
      <p>Welcome Hoooo this is your token: {token} </p>

    </>
  );
}

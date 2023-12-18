import React from "react";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Link, Button } from "@nextui-org/react";
  
export function Home() {
    // const location = useLocation();
    // const token = location.state?.token;
  return (
    <>
    <p>Hello</p>
      <p>Welcome  </p>
     <Button
      href="/login"
      as={Link}
      color="primary"
      showAnchorIcon
      variant="solid"
    >
      Login 
    </Button>
    
     

    </>
  );
}

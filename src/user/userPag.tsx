import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { AcmeLogo } from "./AcmeLogo";
import { Link, Button } from "@nextui-org/react";

export function UserPage() {
  return (
    <>
    <br />
    <Navbar className="mt-6"> 
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ChattAPP</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem style={{ marginRight: "40px" }} >
          <Link color="foreground" href="/ListUser">
            list Users
          </Link>
        </NavbarItem>
        <NavbarItem style={{ marginRight: "40px" }}>
          <Link href="/messagerie" color="foreground" >
            Messagerie
          </Link>
        </NavbarItem>
        <NavbarItem>
        <Link color="foreground" href="#">
            Rooms
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="mt-1 text-center"> {/* Ajustez la classe pour centrer horizontalement */}
        <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat">
            logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </>
  );
}
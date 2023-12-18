import React from "react";
import { UserPage } from "../user/userPag";
import { Messagerie } from "./messagerie";

export function ListMessage() {
  return (
    <>
      <UserPage />
      <br />
      <Messagerie />
    </>
  );
}

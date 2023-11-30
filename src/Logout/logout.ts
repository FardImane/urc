import { Router, Request , Response } from 'express';
import { response } from 'express';
import {Session, SessionCallback, ErrorCallback, User} from "../model/common";
import {CustomError} from "../model/CustomError";
import { text } from 'express';

const router = Router();

async function logout(onResult: SessionCallback, onError: ErrorCallback) {
  const token = sessionStorage.getItem('token');

  if (!token) {
      // Handle the case where the token is not available (optional)
      return "Token not found";
  }

  fetch("/api/logout", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the headers
      },
  })
  .then(async (response) => {

    if (response.ok) {
      const session = await response.json() as Session;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('externalId');
        sessionStorage.removeItem('username');
    } 
})
  .catch((error) => {
      // Handle network errors or other exceptions
     return "There is error : "+error;
  });
}

export default logout;


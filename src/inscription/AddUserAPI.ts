import { json } from "react-router-dom";
import {SessionAddUser, SessionCallback, ErrorCallback, UserPost} from "../model/common";
import {CustomError} from "../model/CustomError";


export function AddUserAPI(
    user: UserPost,
    onResult: (result: { session: SessionAddUser, message: string }) => void,
    onError: ErrorCallback
  ) {
    fetch("api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        if (response.ok) {
        const result = await response.json() as { session: SessionAddUser, message: string };
        onResult(result);
        } else {
          const error = await response.json() as CustomError;
          onError(error);
        }
      })
      .catch(onError);
  }
  
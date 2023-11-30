import {Session, SessionCallback, ErrorCallback, UserList, ListUsersFunction} from "../model/common";
import {CustomError} from "../model/CustomError";
import React, { useEffect, useState } from 'react';

export function List(onResult:ListUsersFunction, onError:ErrorCallback){
    const [session, setSession] = useState<{ token: string } | null>(null);
    useEffect(() =>{
        const storedSession = sessionStorage.getItem('session');
        if (storedSession) {
            const parsedSession = JSON.parse(storedSession);
            setSession(parsedSession);
          }
    },[]);

    fetch("api/users",
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(session?.token)
    }
    
    ).then(async (response) => {
        if (response.ok) {
            const userList = await response.json() as UserList;
            onResult(userList)
        } else {
            
            const error = await response.json() as CustomError;
            onError(error);
        }
    }, onError);


}

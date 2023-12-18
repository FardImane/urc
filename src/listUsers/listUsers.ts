import { ErrorCallback } from "../model/common";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../authSlice';

interface User {
    user_id: number;
    username: string;
    last_login: string | null;
}

interface UserList {
    users: User[];
}

interface ListUsersFunction {
    (userList: UserList): void;
}

interface ListProps {
    onResult: ListUsersFunction;
    onError: ErrorCallback;
}

export function List({ onResult, onError }: ListProps) {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        fetch("api/listUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (response) => {
            if (response.ok) {
                const users = await response.json() as User[];
                setUserList(users);
                const userListObject: UserList = { users };
                onResult(userListObject);
                dispatch(setUsers(users));
            } else {
                const error = await response.json();
                onError({
                    message: error.error,
                    name: ""
                }); 
            }
        }).catch(error => {
            onError({
                message: "An error occurred while fetching data.",
                name: ""
            });
        });
    }, [dispatch, onResult, onError]); // Effect will run once on component mount
}

import React, { useState, useEffect } from "react";
import { List } from "./listUsers";
import { CustomError } from "../model/CustomError";
import { ListUsersFunction, UserList } from "../model/common";

export function Listuser() {
  const [users, setUsers] = useState<UserList | null>(null);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await List();
        setUsers(userList);
      } catch (apiError) {
        setError(apiError);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error ? (
        <div>Error: {error.message}</div>
      ) : users ? (
        <ul>
          {users.users.map((user) => (
            <li key={user.user_id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

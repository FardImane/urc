import React, { useState, useEffect } from 'react';
import { List } from './listUsers'; // Make sure the import path is correct
import { ErrorCallback } from "../model/common";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import './listComponenet.css'; 
import {Button} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import {UserPage} from "../user/userPag";

interface User {
    user_id: number;
    username: string;
    last_login: string | null;
}

interface ListUsersFunction {
    (userList: UserList): void;
}

interface UserList {
    users: User[];
}

interface ListUserComponentProps {
    onResult: ListUsersFunction;
    onError: ErrorCallback;
}

const handleListError: ErrorCallback = (error) => {
    // Handle the error
    console.error(error.message);
};

export function ListUserComponent({ onResult, onError }: ListUserComponentProps) {
    const [userList, setUserList] = useState<User[]>([]);
     const linkimage = "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg";

    List({
        onResult: (userList) => {
            setUserList(userList.users);
            onResult(userList);
        },
        onError: handleListError,
    });

    const [values, setValues] = React.useState(new Set<number>());

    const topContent = React.useMemo(() => {
        if (!userList.length) {
            return null;
        }

        return (
            
            <ScrollShadow
                hideScrollBar
                className="w-full flex py-0.5 px-2 gap-1"
                orientation="horizontal"
            >
                {Array.from(values).map((value) => (
                    <Chip key={value}>{userList.find((user) => user.user_id === value)?.username}</Chip>
                ))}
            </ScrollShadow>
        );
    }, [values, userList]);

    return (
        <>
        <UserPage />
        <ListboxWrapper>
           
            <Listbox
                topContent={topContent}
                classNames={{
                    base: "max-w-xs",
                    list: "max-h-[300px] overflow-scroll",
                }}
                defaultSelectedKeys={[]}
                items={userList}
                label="Assigned to"
                selectionMode="multiple"
                // onSelectionChange={setValues}
                variant="flat"
            >

                {(user) => (
                    <ListboxItem key={user.user_id} textValue={user.username}>
                        <div className="flex gap-2 items-center">
                        <Avatar
                                alt={user.username}
                                className="flex-shrink-0 custom-avatar-size"
                                size="sm" 
                                // src="https://th.bing.com/th/id/OIP.Ln_qrnMeEWlR-sIzaHn2fAHaHa?rs=1&pid=ImgDetMain"
                                 src="user.jpg"
                                />                            <div className="flex flex-col">
                                <span className="text-small">{user.username}</span>
                                <span className="text-tiny text-default-400">{user.last_login || 'Not Loged'}</span>
                            </div>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>
         </ListboxWrapper>
        
         </>
    );
}

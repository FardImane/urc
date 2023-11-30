import {CustomError} from "./CustomError";

export const AUTHENT_HEADER = "Authentication";
export const BEARER = "Bearer ";

export interface User {
    user_id: number;
    username: string;
    email?: string;
    password: string;
    last_login?: string;
    external_id?: string;
}

export interface UserList {
    users: User[];
    
}
export interface ListUsersFunction {
    (userList: UserList): void;
  }

// export interface UserList {
//     (users:UserList): UserList;
// }
export interface SessionCallback {
    (session: Session): void;
}


export interface UserPost {
    username: string;
    email: string;
    password: string;
}

export interface Session {
    token: string;
    username?: string;
    id?: number;
    externalId: string;
}

export interface SessionAddUser {
   token: string,
   message: string
}

export interface EmptyCallback {
    (): void;
}




export interface ErrorCallback {
    (error: CustomError): void;
}




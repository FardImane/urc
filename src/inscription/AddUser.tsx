import { useState, useEffect } from 'react';
import React from "react";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from "../pages/component/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../pages/component/EyeSlashFilledIcon";
import { Button } from "@nextui-org/button";
import { user } from '@nextui-org/theme';
import { Session, SessionAddUser } from "../model/common";
import { CustomError } from "../model/CustomError";
import {AddUserAPI} from "../inscription/AddUserAPI";
import { useNavigate } from "react-router-dom";


export function AddUser() {
  const [formData,setFormData] = useState({
    username:'',
    password:'',
    email:''
  }); 
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as SessionAddUser);
  const [session2, setSession2] = useState({} as Session);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  useEffect(() => {
    const match = password1 === password2;
    setPasswordsMatch(match);
  }, [password1, password2]);
  const navigate = useNavigate();
  const handlePasswordChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };

  const handlePasswordChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
     console.log("API call before");
    AddUserAPI(
      {
        username: data.get("login") as string,
        password: data.get("password") as string,
        email:data.get("email") as string
      },
      (result) => {
        console.log("THis is the result: "+result.session);
        setSession(result.session); 
        form.reset();
        navigate("/login");
        setError(new CustomError(""));
      },
      (loginError: CustomError) => {
        console.log("THis is the error: "+loginError);
        setError(loginError);
        setSession2({} as Session);
      }
    );
    console.log("API call after");
    
  };


  return (
    <>
    
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 shadow-md rounded-md w-96">
          <br /> <br /> <br /> <br /> <br /> <br />
          <h1 className="text-4xl font-extrabold mb-6">Add User</h1><br />
          <form onSubmit={handleSubmit}>
            <Input isRequired
              name="login"
              placeholder="login"
            /><br />
             <Input
        isRequired
        name="email"
        placeholder="email"
        type="email"
      />
      <br/> 
            <Input isRequired
              name="password"
              placeholder="password"
              value={password1}
              onChange={handlePasswordChange1}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="mb-4"
            /><br />
            <Input isRequired
              name="password"
              placeholder="retype password"
              value={password2}
              onChange={handlePasswordChange2}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                  {isVisible2 ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible2 ? "text" : "password"}
              className="mb-4"
            />

            {passwordsMatch && (
              <p className="text-green-500">Passwords match</p>
            )}

            {!passwordsMatch && (
              <p className="text-red-500">Passwords do not match</p>
            )}

            <Button
              type="submit"
              color="primary"
              disabled={!passwordsMatch}
            >
              Add User
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

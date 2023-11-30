
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from './logout';
import {Session, SessionCallback, ErrorCallback, User} from "../model/common";


export function Logoutc() {
  const navigate = useNavigate();

  useEffect(() => {
    const onResult = (session: any) => {
      console.log('Logout successful');
      navigate('/login');
    };

    const onError = (error: any) => {
      console.error('Logout error:', error);
      navigate('/');
    };

    logout(onResult, onError);
  });

  return (
    <div>
      Logging out...
      {/* You can add a loading spinner or other UI elements here if needed */}
    </div>
  );
}

export default Logoutc;
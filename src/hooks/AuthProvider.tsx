/* eslint-disable react/function-component-definition */
import React, {
  useEffect, useState, ReactNode, useMemo,
} from 'react';
import Cookies from 'js-cookie';
import AuthContext from './AuthContext';
import { AuthResponse, User } from '../api';
import { setUser } from '../redux/actions';

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const authResponseCookie = Cookies.get('authResponse');
    if (authResponseCookie) {
      setAuthResponse(JSON.parse(authResponseCookie));
    } else {
      setUser({} as User);
    }
  }, []);

  useEffect(() => {
    if (authResponse) {
      Cookies.set('authResponse', JSON.stringify(authResponse), { expires: 3, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('authResponse', { secure: true, sameSite: 'strict' });
      setUser({} as User);
    }
  }, [authResponse]);

  const value = useMemo(() => ({ authResponse, setAuthResponse }), [authResponse, setAuthResponse]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

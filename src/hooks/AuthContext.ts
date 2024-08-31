import React, { Dispatch, SetStateAction } from 'react';
import { AuthResponse } from '../api';

type AuthContextType = {
  authResponse: AuthResponse | null;
  setAuthResponse: Dispatch<SetStateAction<AuthResponse | null>>;
};

const AuthContext = React.createContext<AuthContextType>({
  authResponse: null,
  setAuthResponse: () => { /* set auth response */ },
});

export default AuthContext;

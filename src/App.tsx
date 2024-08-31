import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import router from './router';
import UserProvider from './hooks/AuthProvider';

function App() {
  return (
    <Theme>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Theme>
  );
}

export default App;

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import router from './router';
import UserProvider from './hooks/AuthProvider';
import store from './redux/store';

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Provider>
    </Theme>
  );
}

export default App;

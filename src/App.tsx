import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import router from './router';
import UserProvider from './hooks/AuthProvider';
import store from './redux/store';
import SearchProvider from './hooks/SearchProvider';

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <UserProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </UserProvider>
      </Provider>
    </Theme>
  );
}

export default App;

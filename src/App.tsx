import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import router from './router';

function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Theme } from '@radix-ui/themes';


function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Authorization } from './components/Authorization';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'auth/login',
        element: <Authorization
          isLogin
        />,
      },
      {
        path: 'auth/register',
        element: <Authorization
          isLogin={false}
        />,
      },
    ],
  },
]);

export default router;

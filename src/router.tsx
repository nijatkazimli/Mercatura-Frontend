import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home/HomePage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Authorization } from './components/Authorization';
import Carts from './components/Cart/Carts';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
      {
        path: 'cart',
        element: <Carts />,
      },
      {
        path: 'cart/:id',
        element: <Cart />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;

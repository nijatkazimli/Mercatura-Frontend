import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/Home';
import { ProductDetails } from './components/ProductDetails';
import { Authorization } from './components/Authorization';
import { Carts, Cart } from './components/Cart';
import { Profile } from './components/Profile';
import { Merchandising } from './components/Merchandising';
import { AdminDashboard } from './components/AdminDashboard';

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
      {
        path: 'merchandising',
        element: <Merchandising />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;

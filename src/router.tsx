import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import * as Pages from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Pages.Layout />,
    children: [
      {
        index: true,
        element: <Pages.HomePage />,
      },
      {
        path: 'product/:id',
        element: <Pages.ProductDetails />,
      },
      {
        path: 'auth/login',
        element: <Pages.Authorization
          isLogin
        />,
      },
      {
        path: 'auth/register',
        element: <Pages.Authorization
          isLogin={false}
        />,
      },
      {
        path: 'cart',
        element: <Pages.Carts />,
      },
      {
        path: 'cart/:id',
        element: <Pages.Cart />,
      },
      {
        path: 'profile',
        element: <Pages.Profile />,
      },
      {
        path: 'contact',
        element: <Pages.Contact />,
      },
      {
        path: 'merchandising',
        element: <Pages.Merchandising />,
      },
      {
        path: 'admin',
        element: <Pages.AdminDashboard />,
      },
      {
        path: '*',
        element: <Pages.ErrorPage />,
      },
    ],
  },
]);

export default router;


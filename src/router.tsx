import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    }
])

export default router;

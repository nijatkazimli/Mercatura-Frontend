import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="container">
            <div></div>
            <div className="link-container">
                <NavLink to="/" className="link">
                    Home
                </NavLink>
                <NavLink to="/" className="link">
                    About
                </NavLink>
                <NavLink to="/" className="link">
                    Contact
                </NavLink>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import Images from "../../constants/Images";
import SearchBar from "../SearchBar/SearchBar";

const search = (term: string) => {
    console.log(term);
};

const Layout = () => {
    return (
        <div className="container">
            <NavLink to="/" className="logo-link">
                <img src={Images.logo.src} alt={Images.logo.alt} className="logo" />
            </NavLink>
            <SearchBar height={40} width={300} placeholder="Search products" onSearch={search} />
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

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';
import { isMobile } from 'react-device-detect';
import Images from '../../constants/Images';
import SearchBar from '../SearchBar/SearchBar';

const search = (term: string, dropdownValue?: string) => {
  // eslint-disable-next-line no-console
  console.log(term + dropdownValue);
};

const dropdownDummyValues = ['Electronics', 'Home Appliances'];

function Layout() {
  return (
    <div>
      <div className="navbar">
        <NavLink to="/" className="logo-link">
          <img src={Images.logo.src} alt={Images.logo.alt} className="logo" />
        </NavLink>
        <SearchBar
          height={40}
          width={isMobile ? 400 : 450}
          placeholder="Search products"
          onSearch={search}
          dropDownPlaceholder="Category"
          dropDownItemValues={dropdownDummyValues}
        />
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
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;

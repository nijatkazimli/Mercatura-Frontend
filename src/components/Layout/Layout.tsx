import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';
import { isMobile } from 'react-device-detect';
import Images from '../../constants/Images';
import SearchBar from '../General/SearchBar';
import { fetchData, ProductCategory } from '../../api';
import AuthContext from '../../hooks/AuthContext';
import LayoutProfilePicture from '../General/LayoutProfilePicture/LayoutProfilePicture';

const search = (term: string, dropdownValue?: string) => {
  // eslint-disable-next-line no-console
  console.log(term + dropdownValue);
};

function Layout() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const { authResponse } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const productCategories = await fetchData<ProductCategory[]>('/category');
      setProductCategories(productCategories);
    };
    fetchCategories();
  }, []);

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
          dropDownItemValues={productCategories.map((category) => category.name)}
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
          {authResponse ? (
            <LayoutProfilePicture />
          )
            : (
              <NavLink to="/auth/login" className="link">
                Login
              </NavLink>
            )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;

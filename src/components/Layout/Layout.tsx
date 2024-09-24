import React, { useContext, useEffect, useState } from 'react';
import {
  NavLink, Outlet, useLocation, useNavigate,
} from 'react-router-dom';
import './Layout.css';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import Images from '../../constants/Images';
import SearchBar from '../General/SearchBar';
import { fetchData, ProductCategory } from '../../api';
import AuthContext from '../../hooks/AuthContext';
import LayoutProfilePicture from '../General/LayoutProfilePicture/LayoutProfilePicture';
import { getCarts, getProducts, getUser } from '../../redux/actions';
import { extractParamFromQuery } from '../../common/utils';

function Layout() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([{ id: '', name: 'All Categories' }]);
  const { authResponse } = useContext(AuthContext);
  const pageQuery = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = (term?: string, dropdownValue?: string) => {
    const searchParams = new URLSearchParams(pageQuery);
    if (term) {
      searchParams.set('name', term);
    } else {
      searchParams.delete('name');
    }
    if (dropdownValue && dropdownValue !== 'All Categories') {
      searchParams.set('category', dropdownValue);
    } else {
      searchParams.delete('category');
    }
    navigate(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (authResponse) {
      dispatch(getCarts(authResponse.id));
      dispatch(getUser({ userId: authResponse.id, token: authResponse.token }));
    }
  }, [dispatch, authResponse]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      const productCategories = await fetchData<ProductCategory[]>('/category');
      setProductCategories([{ id: '', name: 'All Categories' }, ...productCategories]);
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
          key={pageQuery}
          term={extractParamFromQuery('name', pageQuery)}
          height={40}
          width={isMobile ? 400 : 450}
          placeholder="Search products"
          onSearch={search}
          dropDownPlaceholder="Category"
          dropDownValue={extractParamFromQuery('category', pageQuery)}
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

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
import SearchContext from '../../hooks/SearchContext';
import LayoutProfilePicture from '../General/LayoutProfilePicture/LayoutProfilePicture';
import { getCarts, getProducts } from '../../redux/actions';

function Layout() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const { authResponse } = useContext(AuthContext);
  const { setQuery } = useContext(SearchContext);
  const pageQuery = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const extractCategoryFromQuery = (query: string) => {
    if (!query) { return undefined; }
    const searchParams = new URLSearchParams(query);
    return searchParams.get('category') ?? undefined;
  };

  const search = (term?: string, dropdownValue?: string) => {
    const searchParams = new URLSearchParams();
    if (term) {
      searchParams.set('name', term);
    }
    if (dropdownValue) {
      searchParams.set('category', dropdownValue);
    }
    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (authResponse) {
      dispatch(getCarts(authResponse.id));
    }
  }, [dispatch, authResponse]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
          dropDownValue={extractCategoryFromQuery(pageQuery)}
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

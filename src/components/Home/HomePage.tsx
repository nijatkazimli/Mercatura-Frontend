import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LeftBar from '../General/LeftBar';
import ProductGrid from '../General/Product/ProductGrid';
import { fetchData, Product } from '../../api';
import { selectProducts } from '../../redux/selectors';
import SearchContext from '../../hooks/SearchContext';

function HomePage() {
  const allProducts = useSelector(selectProducts);
  const { query, setQuery } = useContext(SearchContext);
  const [products, setProducts] = useState<Array<Product>>(allProducts);

  const pageQuery = useLocation().search;
  useEffect(() => {
    setQuery(pageQuery);
  }, [pageQuery]);

  useEffect(() => {
    const fetchFilteredProducts = async (query: string) => {
      try {
        const filteredProducts = await fetchData<Array<Product>>(`/product${query}`);
        setProducts(filteredProducts);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to filter products');
      }
    };

    if (!query) { setProducts(allProducts); } else { fetchFilteredProducts(query); }
  }, [allProducts, query]);

  return (
    <div className="layout">
      { !isMobile && <LeftBar /> }
      <ProductGrid products={products} />
    </div>
  );
}

export default HomePage;

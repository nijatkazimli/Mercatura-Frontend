import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LeftBar from '../General/LeftBar';
import ProductGrid from '../General/Product/ProductGrid';
import { fetchData, Product } from '../../api';
import { selectProducts } from '../../redux/selectors';

function HomePage() {
  const allProducts = useSelector(selectProducts);
  const [products, setProducts] = useState<Array<Product>>(allProducts);

  const pageQuery = useLocation().search;

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

    if (!pageQuery) { setProducts(allProducts); } else { fetchFilteredProducts(pageQuery); }
  }, [allProducts, pageQuery]);

  return (
    <div className="layout">
      { !isMobile && <LeftBar /> }
      <ProductGrid products={products} />
    </div>
  );
}

export default HomePage;

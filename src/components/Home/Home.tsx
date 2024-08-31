import React, { useEffect, useState } from 'react';
import './Home.css';
import { isMobile } from 'react-device-detect';
import { Grid } from '@radix-ui/themes';
import LeftBar from '../General/LeftBar';
import ProductItem from '../General/Product/ProductItem';
import { fetchData, Product } from '../../api';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchData<Product[]>('/product');
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const getColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return 2;
    } if (screenWidth < 1024) {
      return 3;
    }
    return 5;
  };

  const columns = getColumns();
  const rows = Math.ceil(products.length / columns);

  return (
    <div className="layout">
      { !isMobile && <LeftBar /> }
      <div className="page-content">
        <p>
          Products
        </p>
        <Grid columns={columns.toString()} rows={rows.toString()} gap="3">
          {products.map((product) => <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} />)}
        </Grid>
      </div>
    </div>
  );
}

export default Home;

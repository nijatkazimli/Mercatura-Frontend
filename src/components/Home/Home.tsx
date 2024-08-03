import React from 'react';
import './Home.css';
import { isMobile } from 'react-device-detect';
import { Grid } from '@radix-ui/themes';
import LeftBar from '../LeftBar/LeftBar';
import ProductItem from '../Product/ProductItem/ProductItem';

const dummyProducts = [
  { name: 'Product 1', price: 10.99 },
  { name: 'Product 2', price: 15.49 },
  { name: 'Product 3', price: 7.99 },
  { name: 'Product 4', price: 22.99 },
  { name: 'Product 5', price: 12.99 },
  { name: 'Product 6', price: 19.99 },
  { name: 'Product 7', price: 5.99 },
  { name: 'Product 8', price: 16.49 },
  { name: 'Product 9', price: 9.99 },
  { name: 'Product 10', price: 14.99 },
];

function Home() {
  const getColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return '2';
    } if (screenWidth < 1024) {
      return '3';
    }
    return '5';
  };

  return (
    <div className="layout">
      { !isMobile && <LeftBar /> }
      <div className="page-content">
        <p>
          Products
        </p>
        <Grid columns={getColumns()} gap="3" rows="15">
          {dummyProducts.map((product) => <ProductItem key={product.name} name={product.name} price={product.price} />)}
        </Grid>
      </div>
    </div>
  );
}

export default Home;

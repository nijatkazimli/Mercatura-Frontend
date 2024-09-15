import React from 'react';
import { Grid } from '@radix-ui/themes';
import ProductItem from './ProductItem/ProductItem';
import { Product } from '../../../api';

type Props = {
  products: Array<Product>,
};

function ProductGrid({ products }: Props) {
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
    <div style={{ margin: 10, flex: 1 }}>
      <Grid columns={columns.toString()} rows={rows.toString()} gap="3">
        {products.map((product) => <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} />)}
      </Grid>
    </div>
  );
}

export default ProductGrid;

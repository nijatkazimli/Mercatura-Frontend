import React from 'react';
import { Grid, Spinner } from '@radix-ui/themes';
import ProductItem from './ProductItem/ProductItem';
import { Product } from '../../../api';

type Props = {
  products: Array<Product>,
  isLoading?: boolean,
};

function ProductGrid({ products, isLoading = false }: Readonly<Props>) {
  return (
    <Spinner loading={isLoading} style={{ height: 100 }}>
      <Grid
        columns={{
          initial: '1', xs: '2', sm: '2', md: '3', lg: '5', xl: '5',
        }}
        gap="3"
        display="grid"
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            imageSrc={product?.images?.[0]}
            name={product.name}
            price={product.price}
          />
        ))}
      </Grid>
    </Spinner>
  );
}

export default ProductGrid;

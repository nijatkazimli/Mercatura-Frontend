import React, { useMemo } from 'react';
import { Grid, Spinner } from '@radix-ui/themes';
import ProductItem from './ProductItem/ProductItem';
import { Product } from '../../../api';
import useWindowDimensions from '../../../hooks/WindowDimensions';

type Props = {
  products: Array<Product>,
  isLoading?: boolean,
  isHome?: boolean,
};

function ProductGrid({ products, isLoading = false, isHome = true }: Props) {
  const { width } = useWindowDimensions();
  const leftBarWidth = 255;
  const productTileWidth = 225;
  const getColumns = () => Math.floor((width - (isHome ? leftBarWidth : 0)) / productTileWidth);
  const columns = useMemo(() => getColumns(), [width]);
  const rows = useMemo(() => Math.ceil(products.length / columns), [products, columns]);

  return (
    <div style={{ margin: 10, flex: 1 }}>
      <Spinner loading={isLoading} style={{ height: 100 }}>
        <Grid columns={columns.toString()} rows={rows.toString()} gap="3">
          {products.map((product) => <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} />)}
        </Grid>
      </Spinner>
    </div>
  );
}

export default ProductGrid;

import React, { useEffect } from 'react';
import './ProductList.css';
import { isMobile } from 'react-device-detect';
import { Grid } from '@radix-ui/themes';
import { useSelector, useDispatch } from 'react-redux';
import LeftBar from '../General/LeftBar';
import ProductItem from '../General/Product/ProductItem';
import { selectProducts, selectProductsByIds } from '../../redux/selectors';
import { getProductsByIds } from '../../redux/actions';

type Props = {
  isHome?: boolean,
  productIds?: Array<string>,
}

function ProductList({ isHome = true, productIds }: Props) {
  const products = useSelector(productIds ? selectProductsByIds(productIds) : selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productIds) {
      dispatch(getProductsByIds(productIds));
    }
  }, [productIds]);

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
      { isHome && !isMobile && <LeftBar /> }
      <div className="page-content">
        <Grid columns={columns.toString()} rows={rows.toString()} gap="3">
          {products.map((product) => <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} />)}
        </Grid>
      </div>
    </div>
  );
}

export default ProductList;

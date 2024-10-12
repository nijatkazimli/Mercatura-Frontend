import React from 'react';
import './CartItem.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartsByIds, selectProductsByIds } from '../../redux/selectors';
import ProductGrid from '../General/Product/ProductGrid';

function Cart() {
  const { id } = useParams();
  const selectedCarts = useSelector(selectCartsByIds([id ?? '']));

  const cart = selectedCarts && selectedCarts.length > 0 ? selectedCarts[0] : null;
  const products = useSelector(selectProductsByIds(cart?.productIds ?? ['']));

  if (!cart || !cart.productIds) {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ fontFamily: 'Montserrat' }}>No products found in this cart.</h2>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h2 style={{ fontFamily: 'Montserrat' }}>Products in this cart</h2>
      <ProductGrid products={products} />
    </div>
  );
}

export default Cart;

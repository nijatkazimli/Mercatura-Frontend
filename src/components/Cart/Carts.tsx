import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import FlatList from '../General/FlatList/FlatList';
import CartItem from './CartItem';
import { createCart, deleteCart, payCart } from '../../redux/actions';
import { selectCarts, selectErrorMessage } from '../../redux/selectors';
import AuthContext from '../../hooks/AuthContext';

export type CartUI = {
  id: string,
  numberOfItems: number,
  totalValue: number,
  paid: boolean,
};

function Carts() {
  const [cartsDetails, setCartsDetails] = useState<Array<CartUI>>([]);
  const { authResponse } = useContext(AuthContext);
  const carts = useSelector(selectCarts);
  const error = useSelector(selectErrorMessage);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderListHeader = () => <h2 style={{ fontFamily: 'Montserrat' }}>Your carts</h2>;
  const renderListEmpty = () => <p style={{ fontFamily: 'Montserrat' }}>You do not have any carts.</p>;

  useEffect(() => {
    const cartsDetails: Array<CartUI> = carts.map((cart) => ({
      id: cart.id,
      numberOfItems: cart.productIds.length,
      totalValue: cart.totalValue,
      paid: cart.paid,
    }));
    setCartsDetails(cartsDetails);
    setLoading(false);
  }, [carts]);

  const onGoToCart = (id: string) => {
    navigate(`/cart/${id}`);
  };

  const onPayCart = async (id: string) => {
    if (authResponse) {
      dispatch(payCart({ id, token: authResponse.token }));
    }
  };

  const onDeleteCart = async (id: string) => {
    if (authResponse) {
      dispatch(deleteCart({ id, token: authResponse.token }));
    }
  };

  const onCreateCart = async () => {
    if (authResponse) {
      dispatch(createCart({ id: authResponse.id, token: authResponse.token }));
    }
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      {isLoading || error ? (<p>{error ?? 'Loading...'}</p>)
        : (
          <>
            <FlatList<CartUI>
              ListHeaderComponent={renderListHeader}
              ListEmptyComponent={renderListEmpty}
              data={cartsDetails}
              renderItem={({ item, index }) => (
                <CartItem {...item} index={index} onGoToCart={onGoToCart} onPayCart={onPayCart} onDeleteCart={onDeleteCart} />
              )}
              keyExtractor={(item) => item.id}
            />
            <Button color="purple" size="3" style={{ fontFamily: 'Montserrat' }} onClick={onCreateCart}>
              <PlusCircledIcon />
              Create a new cart
            </Button>
          </>
        )}
    </div>
  );
}

export default Carts;

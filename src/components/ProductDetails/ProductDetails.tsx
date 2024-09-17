import React, { useContext, useEffect, useState } from 'react';
import './ProductDetails.css';
import { Button, DataList, DropdownMenu } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import Images from '../../constants/Images';
import ProductItem from '../General/Product/ProductItem';
import Reviews from '../General/Reviews/Reviews';
import { fetchData, Product } from '../../api';
import { addToCart, addToNewCart } from '../../redux/actions';
import { selectCarts } from '../../redux/selectors';
import AuthContext from '../../hooks/AuthContext';
import { roundToNearestTwoPlaces } from '../../common/utils';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const carts = useSelector(selectCarts);
  const { authResponse } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setError('Product ID is not available.');
        setLoading(false);
        return;
      }

      try {
        const product = await fetchData<Product>(`/product/${id}`);
        setProductDetails(product);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const onAddToCart = async (cartId: string) => {
    if (id && productDetails) {
      dispatch(addToCart({ cartId, productId: id, productValue: productDetails.price }));
    }
  };

  const onAddToNewCart = async () => {
    if (id && authResponse && productDetails) {
      dispatch(addToNewCart({ userId: authResponse.id, productId: id, productValue: productDetails.price }));
    }
  };

  const navigateToLoginIfNotLoggedIn = () => { if (!authResponse) { navigate('/auth/login'); } };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details-container">
      <div className="details-and-similar-container">
        {productDetails && (
          <div className="product-details-container-details">
            <div className="product-details-image">
              <ImageGallery
                items={[{ original: Images.noProductImage.src, thumbnail: Images.noProductImage.src },
                  { original: Images.noProductImage.src, thumbnail: Images.noProductImage.src }]}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </div>
            <div className="product-details">
              <DataList.Root size="3" style={{ marginBottom: 20, marginTop: 10 }}>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Name</DataList.Label>
                  <DataList.Value>{productDetails.name}</DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Price</DataList.Label>
                  <DataList.Value>{`${productDetails.price} $`}</DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Average Rating</DataList.Label>
                  <DataList.Value>{roundToNearestTwoPlaces(productDetails.rating)}</DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Category</DataList.Label>
                  <DataList.Value>{productDetails.category}</DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Description</DataList.Label>
                  <DataList.Value>{productDetails.description ?? 'No description available.'}</DataList.Value>
                </DataList.Item>
              </DataList.Root>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button color="purple" size="3" className="add-to-card-button" onClick={navigateToLoginIfNotLoggedIn}>
                    <PlusCircledIcon />
                    {' '}
                    Add to Cart
                  </Button>
                </DropdownMenu.Trigger>
                {authResponse && (
                  <DropdownMenu.Content>
                    {carts.map((cart, index) => (
                      <DropdownMenu.Item
                        key={cart.id}
                        shortcut={`${cart.productIds.length.toString()} item${cart.productIds.length > 1 ? 's' : ''}`}
                        onClick={() => onAddToCart(cart.id)}
                      >
                        Cart
                        {' '}
                        {index + 1}
                      </DropdownMenu.Item>
                    ))}
                    {!!carts.length && <DropdownMenu.Separator />}
                    <DropdownMenu.Item onClick={onAddToNewCart}>
                      Add to new cart
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                )}
              </DropdownMenu.Root>
            </div>
          </div>
        )}
        <div className="reviews">
          <p>Reviews</p>
          <Reviews productId={id ?? '0'} />
        </div>
      </div>
      <div>
        <p>Also see</p>
        <ProductItem id="1" name="Test" price={10} />
        <ProductItem id="2" name="Test2" price={30} />
      </div>
    </div>
  );
}

export default ProductDetails;

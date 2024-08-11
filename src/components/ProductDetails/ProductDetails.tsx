import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Button } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';
import Images from '../../constants/Images';
import ProductItem from '../General/Product/ProductItem';
import Reviews from '../General/Reviews/Reviews';
import { fetchData, Product } from '../../api';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details-container">
      <div className="details-and-similar-container">
        {productDetails && (
          <div>
            <img
              src={productDetails.image || Images.noProductImage.src}
              alt={productDetails.name || Images.productImage.alt}
              className="product-details-image"
            />
            <p>{productDetails.name}</p>
            <p>
              {productDetails.price}
              {' '}
              $
            </p>
            <p>{productDetails.category}</p>
            <p>{productDetails.description ?? 'No description available.'}</p>
            <Button color="purple" size="3" className="add-to-card-button">
              <PlusCircledIcon />
              {' '}
              Add to Cart
            </Button>
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

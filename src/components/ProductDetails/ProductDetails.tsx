import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Button } from '@radix-ui/themes';
import { PlusCircledIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';
import Images from '../../constants/Images';
import ProductItem from '../General/Product/ProductItem';
import Reviews from '../General/Reviews/Reviews';
import { fetchData, Product, Review } from '../../api';
import { getAverageRating } from '../../common/utils';

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<Product>();
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    const fetchDetails = async () => {
      const productDetails = await fetchData<Product>(`/product/${id}`);
      setProductDetails(productDetails);
    };

    const fetchReviews = async () => {
      const reviews = await fetchData<Review[]>(`/review/get?productId=${id}`);
      setReviews(reviews);
    };

    fetchDetails();
    fetchReviews();
  }, []);

  const renderStars = () => {
    const averageRating = Math.round(getAverageRating(reviews ?? []));
    return Array.from({ length: 5 }, (_, i) => (
      i < averageRating - 1 ? <StarFilledIcon key={i} /> : <StarIcon key={i} />
    ));
  };

  return (
    <div className="product-details-container">
      <div className="details-and-similar-container">
        {productDetails && (
          <div>
            <img src={Images.noProductImage.src} alt={Images.productImage.alt} className="product-details-image" />
            <p>{productDetails.name}</p>
            <p>
              {productDetails.price}
              {' '}
              $
            </p>
            <p>{productDetails.category}</p>
            <p>{productDetails.description ?? ''}</p>
            <p>
              {renderStars()}
              {'  '}
              {`(${getAverageRating(reviews ?? [])})`}
            </p>
            <Button color="purple" size="3" className="add-to-card-button">
              <PlusCircledIcon />
              {' '}
              Add to Card
            </Button>
          </div>
        )}
        <div className="reviews">
          <p>Reviews</p>
          <Reviews reviews={reviews ?? []} />
        </div>
      </div>
      <div>
        <p>Also see</p>
        <ProductItem id="1" name="Test" price={10} />
        {/* after filtering */}
        <ProductItem id="1" name="Test2" price={30} />
      </div>
    </div>
  );
}

export default ProductDetails;

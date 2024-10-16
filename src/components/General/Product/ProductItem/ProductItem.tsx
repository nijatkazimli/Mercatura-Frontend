import React from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../../../../constants/Images';
import './ProductItem.css';

type Props = {
  id: string,
  imageSrc?: string,
  name: string,
  price: number,
};

function ProductItem({
  id, imageSrc, name, price,
}: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="container"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img
        className="image"
        src={imageSrc ?? Images.noProductImage.src}
        alt={imageSrc ? Images.productImage.alt : Images.noProductImage.alt}
      />
      <div className="name-and-price">
        <p>{name}</p>
        <p style={{ fontFamily: 'system-ui' }}>
          {price}
          {' '}
          $
        </p>
      </div>
    </div>
  );
}

export default ProductItem;

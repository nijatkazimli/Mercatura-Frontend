import React from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../../../../constants/Images';
import './ProductItem.css';

type Props = {
    imageSrc?: string,
    name: string,
    price: number,
};

function ProductItem({ imageSrc, name, price }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products/1');
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
      <p>{name}</p>
      <p>
        {price}
        {' '}
        $
      </p>
    </div>
  );
}

export default ProductItem;

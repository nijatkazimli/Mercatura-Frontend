import React from "react";
import Images from "../../../constants/Images";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";

type Props = {
    imageSrc?: string,
    name: string,
    price: number,
};

const ProductItem = ({ imageSrc, name, price }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/products/1");
    };

    return (
        <div className="container" onClick={handleClick}>
            <img
                className="image"
                src={imageSrc ?? Images.noProductImage.src}
                alt={imageSrc ? Images.productImage.alt : Images.noProductImage.alt}
            />
            <p>{name}</p>
            <p>{price} $</p>
        </div>
    )
};

export default ProductItem;

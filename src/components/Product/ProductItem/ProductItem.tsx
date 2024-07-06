import React from "react";
import Images from "../../../constants/Images";
import "./ProductItem.css";

type Props = {
    imageSrc?: string,
    name: string,
    price: number,
};

const ProductItem = ({ imageSrc, name, price }: Props) => {
    return (
        <div className="container">
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

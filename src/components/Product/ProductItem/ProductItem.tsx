import React from "react";
import Images from "../../../constants/Images";
import "./ProductItem.css";

const ProductItem = () => {
    return (
        <div className="container">
            <img className="image" src={Images.noProductImage.src} alt={Images.noProductImage.alt} />
            <p>Item 1</p>
            <p>100 $</p>
        </div>
    )
};

export default ProductItem;

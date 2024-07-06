import React from "react";
import Images from "../../../constants/Images";
import "./ProductDetails.css";
import { Button } from "@radix-ui/themes";
import { PlusCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import ProductItem from "../ProductItem/ProductItem";

const ProductDetails = () => {
    return (
        <div className="product-details-container">
            <div className="details-and-similar-container">
                <div>
                    <img src={Images.noProductImage.src} alt={Images.productImage.alt} className="product-details-image"/>
                    <p>Item 1</p>
                    <p>100 $</p>
                    <p>New</p>
                    <p>Electronics</p>
                    <p>Very good description</p>
                    <p>
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon />
                        <StarFilledIcon /> (125 reviews)
                    </p>
                    <Button color={"purple"} size={'3'} className="add-to-card-button">
                        <PlusCircledIcon /> Add to Card
                    </Button>
                </div>
                <div className="reviews">
                    <p>Reviews</p>
                </div>
            </div>
            <div>
                <p>Also see</p>
                <ProductItem name="Test" price={10} />
                <ProductItem name="Test2" price={30} />
            </div>
        </div>
    )
};

export default ProductDetails;

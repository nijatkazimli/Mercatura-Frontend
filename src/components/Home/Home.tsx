import React from "react";
import LeftBar from "../LeftBar/LeftBar";
import "./Home.css";
import { isMobile } from "react-device-detect";
import { Grid } from "@radix-ui/themes";
import ProductItem from "../Product/ProductItem/ProductItem";

const Home = () => {

    const getColumns = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            return '2';
        } else if (screenWidth < 1024) {
            return '3';
        } else {
            return '5';
        }
    };

    return (
        <div className="layout">
            { !isMobile && <LeftBar /> }
            <div className="page-content">
                <p>
                    Products
                </p>
                <Grid columns={getColumns()} gap={'3'} rows={'15'}>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </Grid>
            </div>
        </div>
    );
};

export default Home;

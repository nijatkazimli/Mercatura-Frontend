import React from "react";
import LeftBar from "../LeftBar/LeftBar";
import "./Home.css";
import { isMobile } from "react-device-detect";

const Home = () => {
    return (
        <div className="layout">
            { !isMobile && <LeftBar /> }
            <div className="page-content">
                <p>
                    Products
                </p>
            </div>
        </div>
    );
};

export default Home;

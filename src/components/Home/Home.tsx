import React from "react";
import LeftBar from "../LeftBar/LeftBar";
import "./Home.css";

const Home = () => {
    return (
        <div className="layout">
            <LeftBar />
            <div className="page-content">
                <p>
                    Products
                </p>
            </div>
        </div>
    );
};

export default Home;

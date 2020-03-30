import React from "react";
import App from "../src/App";

const index = () => {
    return (
        <App pageName="Home" />
    )
};
// this static method is run on the server side
// inside node.js when the url is first hit
// then again when the page renders on the client side 
index.getInitialProps = async ({ req }) => {
    const isServer = !!req;
    return { isServer }
};

export default index;
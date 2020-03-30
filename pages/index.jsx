import React from "react";
import App from "../src/App";
import ls from "local-storage";

const Index = ({ user, isServer }) => {
    const isBrowser = typeof window !== "undefined";

    // this means running on first page load and 
    // inside the browser so should store in local storage
    if(isServer && isBrowser) {
        ls.set("userInfo", user)
    }
    return (
        <App pageName="Home" userInfo={user} />
    )
};
// this static method is run on the server side
// inside node.js when the url is first hit
// then again when the page renders on the client side 
// when running SS, getInitialProps has access to user email
// assuming user is authenticated
Index.getInitialProps = async ({ req }) => {
    const isServer = !!req;
    
    if (isServer) {
        return { user: req.user, isServer }
    } else {
        try {
            const user = ls.get("userInfo")
            return { user, isServer }
        }   catch (e) {
            return { isServer }
        }
    }
};

export default Index;
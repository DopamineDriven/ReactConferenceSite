import React from "react";
import Home from "./Home.jsx";
import Speakers from "./Speakers.jsx";
import Login from './Login.jsx'

// two pages
// index.jsx
// speakers.jsx
// creating ConfigContext (createContext())
export const ConfigContext = React.createContext();

const pageToShow = pageName => {
    if (pageName === "Home") return <Home />;
    if (pageName === "Speakers") return <Speakers />;
    if (pageName === "Login") return <Login />;
    return <div>Not Found</div>
};

// theoretically we plan on being able to access this attribute value from 
// any component that is below App on the tree
const configValue = {
    showSignMeUp: true,
    showSpeakerSpeakingDays: true
};

// wrap pageToShow with ConfigContext.Provider
// then, pass attribute value to provider which can be any JS object
const App = ({ pageName, userInfo }) => {
    console.log("App.jsx:userInfo.email", userInfo ? userInfo.email : "Null")
    configValue.loggedInUserEmail = userInfo ? userInfo.email : null;
    return (
    <ConfigContext.Provider value={configValue}>
        <div>
            {pageToShow(pageName)}
        </div>
    </ConfigContext.Provider>
    )
};

export default App;
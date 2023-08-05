import React from "react";
import Router from "@/Router";
import { ConfigContext } from "./Setup";

const App = () => {
    return (
        <ConfigContext.Provider value={{ me: "supakornpond", her: "jjunepyr" }}>
            <Router />
        </ConfigContext.Provider>
    );
};

export default App;

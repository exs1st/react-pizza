import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { MainPage } from "./";
import Store from "store";

function App() {
    return (
        <Provider store={Store}>
            <BrowserRouter>
                <Route path="/" component={MainPage} />
            </BrowserRouter>
        </Provider>
    );
}

export default App;

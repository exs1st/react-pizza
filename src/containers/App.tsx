import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from "mobx-react";
import { MainPage, CartPage } from "./";
import Store from "store";

function App() {
    return (
        <Provider store={Store}>
            <BrowserRouter>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/cart" component={CartPage} />
            </BrowserRouter>
        </Provider>
    );
}

export default App;

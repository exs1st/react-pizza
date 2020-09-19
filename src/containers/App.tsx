import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Provider } from "mobx-react";
import Store from "store";

const MainPage = lazy(() => import("./MainPage"));
const CartPage = lazy(() => import("./CartPage"));

function App() {
    return (
        <Suspense fallback={<h2>App loading. Please wait ...</h2>}>
            <Provider store={Store}>
                <BrowserRouter>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/cart" component={CartPage} />
                </BrowserRouter>
            </Provider>
        </Suspense>
    );
}

export default App;

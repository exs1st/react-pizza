import React from "react";
import { observer, inject } from "mobx-react";
import { CartContent, CartEmpty, Header } from "components";

import { IStore } from "types";

const CartPage = ({ store }: { store: IStore }) => {
    const { pizzaCart } = store;
    return (
        <div className="cart-page">
            <Header withCart={false} headerText="Самая реактивная пицца" />

            {pizzaCart.length === 0 ? <CartEmpty /> : <CartContent />}
        </div>
    );
};

export default inject("store")(observer(CartPage));

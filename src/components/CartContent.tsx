import React from "react";

import OrderListItem from "./OrderListItem";

import Carticon from "assets/img/cart-icon-order.svg";
import DeleteIcon from "assets/img/delete-icon.svg";
import { inject, observer } from "mobx-react";
import { IStore } from "types";
import CartFooter from "./CartFooter";

function CartContent({ store }: { store?: IStore }) {
    if (store) {
        const {
            clearCart,
            pizzaCart,
            fetchOnePizza,
            getDough,
            changeCountPizzaInCart,
            deleteOrderFromCart,
            allCount,
            totalPrice,
        } = store;
        return (
            <div className="cart-page__content">
                <div className="cart-page__content__top">
                    <div className="cart-page__content__title">
                        <img
                            className="cart-page__content__title__icon"
                            src={Carticon}
                            alt="Cart icon"
                        />
                        <h3 className="cart-page__content__title__text">
                            Корзина
                        </h3>
                    </div>
                    <div
                        className="cart-page__content__clear"
                        onClick={() => clearCart()}
                    >
                        <img
                            className="cart-page__content__clear__icon"
                            src={DeleteIcon}
                            alt="Delete icon"
                        />
                        <span className="cart-page__content__clear__text">
                            Очистить корзину
                        </span>
                    </div>
                </div>
                {pizzaCart.map((pizzaOrder) => {
                    return (
                        <OrderListItem
                            key={pizzaOrder.id}
                            fetchOnePizza={fetchOnePizza}
                            getDough={getDough}
                            pizzaOrder={pizzaOrder}
                            changeCountPizzaInCart={changeCountPizzaInCart}
                            deleteOrderFromCart={deleteOrderFromCart}
                        />
                    );
                })}

                <CartFooter allCount={allCount} totalPrice={totalPrice} />
            </div>
        );
    }
    return <div>Loading store...</div>;
}

export default inject("store")(observer(CartContent));

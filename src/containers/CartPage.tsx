import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Header } from "./";

import Empty from "assets/img/cart-empty.svg";
import EmptySmile from "assets/img/empty-smile.svg";
import { OrderListItem } from "components";

const CartPage = ({ store }: any) => {
    const { pizzaCart, fetchOnePizza, getDough } = store;
    return (
        <div className="cart-page">
            <div className="container">
                <Header withCart={false} />
                {pizzaCart.length === 0 ? (
                    <div className="cart-page__empty">
                        <h3 className="cart-page__empty__title">
                            Корзина пустая{" "}
                            <img src={EmptySmile} alt="Smile sad" />
                        </h3>
                        <div className="cart-page__empty__caption">
                            <p>Вероятней всего, вы не заказывали ещё пиццу.</p>
                            <p>
                                Для того, чтобы заказать пиццу, перейди на
                                главную страницу.
                            </p>
                        </div>
                        <img
                            className="cart-page__empty__img"
                            src={Empty}
                            alt="Empty cart "
                        />
                        <Link to="/" className="cart-page__empty__back-btn">
                            Вернуться назад
                        </Link>
                    </div>
                ) : (
                    <div className="cart-page__content">
                        {pizzaCart.map((pizzaOrder: any) => {
                            return (
                                <OrderListItem
                                    key={pizzaOrder.id}
                                    fetchOnePizza={fetchOnePizza}
                                    getDough={getDough}
                                    {...pizzaOrder}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default inject("store")(observer(CartPage));

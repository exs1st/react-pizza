import React from "react";
import { Link } from "react-router-dom";

import Empty from "assets/img/cart-empty.svg";
import EmptySmile from "assets/img/empty-smile.svg";

function CartEmpty() {
    return (
        <div className="cart-page__empty">
            <h3 className="cart-page__empty__title">
                Корзина пустая <img src={EmptySmile} alt="Smile sad" />
            </h3>
            <div className="cart-page__empty__caption">
                <p>Вероятней всего, вы не заказывали ещё пиццу.</p>
                <p>
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
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
    );
}

export default CartEmpty;

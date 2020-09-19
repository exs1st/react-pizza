import React from "react";
import { Link } from "react-router-dom";

import BackIcon from "assets/img/back-icon.svg";
import { IStore } from "types";

interface IProps {
    allCount: IStore["allCount"];
    totalPrice: IStore["totalPrice"];
}

function CartFooter(props: IProps) {
    const { allCount, totalPrice } = props;
    return (
        <div className="cart-page__footer">
            <div className="cart-page__footer__info">
                <div className="cart-page__footer__info__count">
                    Всего пицц: <span> {allCount} шт.</span>
                </div>
                <div className="cart-page__footer__info__total-price">
                    Сумма заказа: <span> {totalPrice} ₽</span>
                </div>
            </div>
            <div className="cart-page__footer__buttons">
                <Link className="cart-page__footer__buttons__back" to="/">
                    <img src={BackIcon} alt="Back icon" />
                    <span>Вернуться назад</span>
                </Link>
                <button className="cart-page__footer__buttons__pay">
                    Оплатить сейчас
                </button>
            </div>
        </div>
    );
}

export default CartFooter;

import React from "react";
import { Link } from "react-router-dom";

import PizzaLogo from "assets/img/logo.svg";
import CartIcon from "assets/img/cart-icon.svg";

interface IProps {
    withCart: boolean;
    allCount?: number;
    totalPrice?: number;
}

export default function Header({
    withCart,
    allCount,
    totalPrice,
    ...otherProps
}: IProps) {
    console.log(otherProps);
    return (
        <div className=" header">
            <div className="header__logo">
                <img
                    className="header__logo__image"
                    src={PizzaLogo}
                    alt="Pizza logo"
                />
                <div className="header__logo__caption">
                    <div className="header__logo__caption__title">
                        REACT PIZZA
                    </div>
                    <div className="header__logo__caption__text">
                        самая вкусная пицца во вселенной
                    </div>
                </div>
            </div>
            {withCart && (
                <Link to="/cart" className="header__cart">
                    <div className="header__cart__price">{totalPrice} ₽</div>
                    <div className="header__cart__dash" />
                    <div className="header__cart__count">
                        <img
                            className="header__cart__count__icon"
                            src={CartIcon}
                            alt="Cart icon"
                        />
                        {allCount}
                    </div>
                </Link>
            )}
        </div>
    );
}

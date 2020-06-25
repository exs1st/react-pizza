import React from "react";

import PizzaLogo from "../assets/img/logo.svg";
import CartIcon from "../assets/img/cart-icon.svg";

import CheeseBurgerPizza from "../assets/img/goods/cheese-burger-pizza.png";
import CheesePizza from "../assets/img/goods/cheese-pizza.png";

import "./App.scss";

function App() {
    return (
        <div className="home">
            <div className="container">
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
                    <div className="header__cart">
                        <div className="header__cart__price">520 ₽</div>
                        <div className="header__cart__dash" />
                        <div className="header__cart__count">
                            <img
                                className="header__cart__count__icon"
                                src={CartIcon}
                                alt="Cart icon"
                            />
                            3
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="content__filters">
                        <button className="content__filters__btn active">
                            Все
                        </button>
                        <button className="content__filters__btn">
                            Мясные
                        </button>
                        <button className="content__filters__btn">
                            Вегетарианская
                        </button>
                        <button className="content__filters__btn">Гриль</button>
                        <button className="content__filters__btn">
                            Острые
                        </button>
                        <button className="content__filters__btn">
                            Закрытые
                        </button>
                    </div>
                    <div className="content__sort">
                        <div className="content__sort__label">
                            <svg
                                className="content__sort__label__arrow"
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69076 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#2C2C2C"
                                />
                            </svg>

                            <span className="content__sort__label__title">
                                Сортировка по:
                            </span>
                            <span className="content__sort__label__current">
                                популярности
                            </span>
                        </div>

                        <ul className="content__sort__select">
                            <li className="content__sort__select__item active">
                                популярности
                            </li>
                            <li className="content__sort__select__item">
                                цене
                            </li>
                            <li className="content__sort__select__item">
                                алфавиту
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="goods">
                    <h2 className="goods__title">Все пиццы</h2>
                    <div className="goods__list">
                        <div className="goods__list__item">
                            <div className="goods__list__item__image">
                                <img
                                    src={CheeseBurgerPizza}
                                    alt="CheeseBurgerPizza"
                                />
                            </div>
                            <div className="goods__list__item__title">
                                Чизбургер-пицца
                            </div>
                            <div className="goods__list__item__options">
                                <div className="goods__list__item__options__dough">
                                    <button className="goods__list__item__options__btn active">
                                        тонкое
                                    </button>
                                    <button className="goods__list__item__options__btn">
                                        традиционное
                                    </button>
                                </div>
                                <div className="goods__list__item__options__diametr">
                                    <button className="goods__list__item__options__btn active">
                                        26 см.
                                    </button>
                                    <button className="goods__list__item__options__btn">
                                        30 см.
                                    </button>
                                    <button className="goods__list__item__options__btn">
                                        40 см.
                                    </button>
                                </div>
                            </div>
                            <div className="goods__list__item__cart">
                                <div className="goods__list__item__cart__price">
                                    от 395 ₽
                                </div>
                                <button className="goods__list__item__cart__add">
                                    <svg
                                        className="goods__list__item__cart__add__plus"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
                                    </svg>
                                    Добавить
                                    <span className="goods__list__item__cart__add__count">
                                        2
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="goods__list__item">
                            <div className="goods__list__item__image">
                                <img src={CheesePizza} alt="CheesePizza" />
                            </div>
                            <div className="goods__list__item__title">
                                Сырная
                            </div>
                            <div className="goods__list__item__options">
                                <div className="goods__list__item__options__dough">
                                    <button className="goods__list__item__options__btn active">
                                        тонкое
                                    </button>
                                    <button className="goods__list__item__options__btn">
                                        традиционное
                                    </button>
                                </div>
                                <div className="goods__list__item__options__diametr">
                                    <button className="goods__list__item__options__btn active">
                                        26 см.
                                    </button>
                                    <button className="goods__list__item__options__btn disabled">
                                        30 см.
                                    </button>
                                    <button className="goods__list__item__options__btn disabled">
                                        40 см.
                                    </button>
                                </div>
                            </div>
                            <div className="goods__list__item__cart">
                                <div className="goods__list__item__cart__price">
                                    от 395 ₽
                                </div>
                                <button className="goods__list__item__cart__add">
                                    <svg
                                        className="goods__list__item__cart__add__plus"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
                                    </svg>
                                    Добавить
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

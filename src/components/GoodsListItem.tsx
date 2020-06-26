import React, { useState } from "react";

interface IProps {
    name: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export default function GoodsListItem({
    name,
    imageUrl,
    types,
    sizes,
}: IProps) {
    const [dough] = useState([
        { id: 0, name: "Тонкое" },
        { id: 1, name: "Традиционное" },
    ]);
    const [currentOptions, setCurrentOptions] = useState({
        currentDough: types[0],
        currentSize: sizes[0],
    });
    return (
        <div className="goods__list__item">
            <div className="goods__list__item__image">
                <img src={imageUrl} alt="CheeseBurgerPizza" />
            </div>
            <div className="goods__list__item__title">{name}</div>
            <div className="goods__list__item__options">
                <div className="goods__list__item__options__dough">
                    {types &&
                        types.map((type) => {
                            const { name } = dough.find(
                                (dough) => dough.id === type
                            )!;
                            const classes =
                                currentOptions.currentDough === type
                                    ? "active"
                                    : "";
                            return (
                                <button
                                    key={type}
                                    className={`goods__list__item__options__btn ${classes}`}
                                    onClick={() =>
                                        setCurrentOptions({
                                            ...currentOptions,
                                            currentDough: type,
                                        })
                                    }
                                >
                                    {name}
                                </button>
                            );
                        })}
                </div>
                <div className="goods__list__item__options__diametr">
                    {sizes &&
                        sizes.map((size: number) => {
                            const activeClass =
                                currentOptions.currentSize === size
                                    ? "active"
                                    : "";
                            return (
                                <button
                                    key={size}
                                    className={`goods__list__item__options__btn ${activeClass}`}
                                    onClick={() =>
                                        setCurrentOptions({
                                            ...currentOptions,
                                            currentSize: size,
                                        })
                                    }
                                >
                                    {size}
                                </button>
                            );
                        })}
                </div>
            </div>
            <div className="goods__list__item__cart">
                <div className="goods__list__item__cart__price">от 395 ₽</div>
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
    );
}

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ICart, IStore } from "types";

import MinusIcon from "assets/img/minus-icon.svg";
import PlusIcon from "assets/img/plus-icon.svg";
import CloseIcon from "assets/img/close-icon.svg";

interface IPizzaData {
    category: number;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    rating: number;
    sizes: number[];
    types: number[];
}

interface IProps {
    fetchOnePizza: IStore["fetchOnePizza"];
    getDough: IStore["getDough"];
    pizzaOrder: ICart;
    changeCountPizzaInCart: IStore["changeCountPizzaInCart"];
    deleteOrderFromCart: IStore["deleteOrderFromCart"];
}

function OrderListItem(props: IProps) {
    const [pizzaData, setPizzaData] = useState<IPizzaData>();
    const [doughName, setDoughName] = useState("");

    const {
        fetchOnePizza,
        getDough,
        pizzaOrder,
        changeCountPizzaInCart,
        deleteOrderFromCart,
    } = props;
    const { pizzaId, dough, size, count, price, id } = pizzaOrder;

    useEffect(() => {
        let currentDough = getDough(dough)!;
        setDoughName(currentDough.name);
        fetchOnePizza(pizzaId).then((pizza: IPizzaData) => {
            setPizzaData(pizza);
        });
    }, [dough, fetchOnePizza, getDough, pizzaId]);

    let changeCountPizza = (value: number) => {
        changeCountPizzaInCart(id, value);
    };

    if (pizzaData) {
        const { imageUrl, name } = pizzaData;
        return (
            <div className="order">
                <div className="order__top-border"></div>
                <div className="order__content">
                    <div className="order__content__left">
                        <div className="order__content__img">
                            <img src={imageUrl} alt={name} loading="lazy" />
                        </div>
                        <div className="order__content__text">
                            <div className="order__content__text__name">
                                {name}
                            </div>
                            <div className="order__content__text__options">
                                {doughName.toLowerCase()}, {size} см.
                            </div>
                        </div>
                    </div>
                    <div className="order__content__right">
                        <div className="order__content__counter">
                            <button
                                className="order__content__counter__minus"
                                onClick={() => changeCountPizza(-1)}
                            >
                                <img src={MinusIcon} alt="Minus icon" />
                            </button>
                            <div className="order__content__counter__count">
                                {count}
                            </div>
                            <button
                                className="order__content__counter__plus"
                                onClick={() => changeCountPizza(1)}
                            >
                                <img src={PlusIcon} alt="Plus icon" />
                            </button>
                        </div>
                        <div className="order__content__price">
                            <span>{price * count}</span> ₽
                        </div>
                        <button
                            className="order__content__delete-btn"
                            onClick={() => deleteOrderFromCart(id)}
                        >
                            <img src={CloseIcon} alt="Close icon" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return <div>Loading ...</div>;
}

export default observer(OrderListItem);

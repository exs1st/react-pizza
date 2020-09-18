import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

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

function OrderListItem(props: any) {
    const [pizzaData, setPizzaData] = useState<IPizzaData>();
    const [doughName, setDoughName] = useState("");

    const { fetchOnePizza, getDough, ...otherProps } = props;
    const { pizzaId, dough, size, count, price } = otherProps;

    useEffect(() => {
        let currentDough = getDough(dough);
        setDoughName(currentDough.name);
        fetchOnePizza(pizzaId).then((pizza: any) => {
            setPizzaData(pizza);
        });
    }, [dough, fetchOnePizza, getDough, pizzaId]);
    console.log(otherProps);

    if (pizzaData) {
        const { imageUrl, name } = pizzaData;
        return (
            <div className="order">
                <div className="order__top-border"></div>
                <div className="order__content">
                    <div className="order__content__left">
                        <div className="order__content__img">
                            <img src={imageUrl} alt={name} />
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
                            <div className="order__content__counter__minus">
                                <span></span>
                            </div>
                            <div className="order__content__counter__count">
                                {count}
                            </div>
                            <div className="order__content__counter__plus">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="order__content__price">
                            <span>{price * count}</span> ₽
                        </div>
                        <div className="order__content__delete-btn">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <div>Loading ...</div>;
}

export default observer(OrderListItem);

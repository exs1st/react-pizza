import React from "react";
import { observer } from "mobx-react";

import { GoodsListItem } from "./";

interface IProps {
    goods: any[];
    pizzaCart: any[];
    addToCart: (
        pizzaId: number,
        dough: number,
        size: number,
        price: number,
        count: number
    ) => void;
}

function GoodsList({ goods, pizzaCart, addToCart }: IProps) {
    return (
        <div className="goods">
            <h2 className="goods__title">Все пиццы</h2>
            {goods ? (
                <div className="goods__list">
                    {goods.map(({ id, ...otherData }) => {
                        let countInCart = 0;
                        pizzaCart.forEach((order) => {
                            if (order.pizzaId === id) {
                                countInCart += order.count;
                            }
                        });
                        return (
                            <GoodsListItem
                                key={id}
                                countInCart={countInCart}
                                addToCart={addToCart}
                                id={id}
                                {...otherData}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default observer(GoodsList);

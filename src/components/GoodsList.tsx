import React from "react";
import { observer } from "mobx-react";

import { GoodsListItem } from "./";
import { IPizza, IStore } from "types";

interface IProps {
    goods: IPizza[];
    pizzaCart: IStore["pizzaCart"];
    getDough: IStore["getDough"];
    addToCart: IStore["addToCart"];
}

function GoodsList({ goods, pizzaCart, addToCart, getDough }: IProps) {
    const clearClass =
        goods.length < 3 && goods.length % 6 !== 0 ? "after-clear" : "";
    return (
        <div className="goods">
            <h2 className="goods__title">Все пиццы</h2>
            {goods ? (
                <div className={`goods__list ${clearClass}`}>
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
                                getDough={getDough}
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

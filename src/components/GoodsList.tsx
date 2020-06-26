import React from "react";

import { GoodsListItem } from "./";

interface IProps {
    goods: any[];
}

export default function GoodsList({ goods }: IProps) {
    return (
        <div className="goods">
            <h2 className="goods__title">Все пиццы</h2>
            {goods ? (
                <div className="goods__list">
                    {goods.map(({ id, ...otherData }) => {
                        return <GoodsListItem key={id} {...otherData} />;
                    })}
                </div>
            ) : null}
        </div>
    );
}

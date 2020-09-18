import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

import { Header, Options } from "./";
import { GoodsList } from "components";
import { IStore } from "types";

const MainPage = ({ store }: { store: IStore }) => {
    const {
        categories,
        allCount,
        totalPrice,
        pizzaCart,
        addToCart,
        getPizza,
        sortIsOpen,
        sorts,
        handleSortOpen,
        changeSort,
        sortTo,
        handleSortToClick,
        getDough,
    } = store;

    useEffect(() => {
        store.fetchPizza();
    }, [store]);

    let onFilterClick = (id: number) => {
        store.changeActive(id);
    };

    const pizzas = getPizza();
    return (
        <div className="home">
            <div className="container">
                <Header withCart allCount={allCount} totalPrice={totalPrice} />
                <Options
                    filters={categories}
                    sorts={sorts}
                    onFilterClick={onFilterClick}
                    sortIsOpen={sortIsOpen}
                    sortOpen={handleSortOpen}
                    changeSort={changeSort}
                    sortTo={sortTo}
                    handleSortToClick={handleSortToClick}
                />
                <GoodsList
                    goods={pizzas}
                    pizzaCart={pizzaCart}
                    addToCart={addToCart}
                    getDough={getDough}
                />
            </div>
        </div>
    );
};

export default inject("store")(observer(MainPage));

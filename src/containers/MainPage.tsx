import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

import { Header, Options } from "./";
import { GoodsList } from "components";

const MainPage = ({ store }: any) => {
    const {
        categories,
        allCount,
        totalPrice,
        pizzaCart,
        addToCart,
        getPizza,
        activeCategory,
        sortIsOpen,
        sorts,
        handleSortOpen,
        changeSort,
        sortTo,
        handleSortToClick,
    } = store;

    useEffect(() => {
        store.fetchPizza();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let onFilterClick = (id: number) => {
        store.changeActive(id);
    };

    const pizzas = getPizza(activeCategory);
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
                />
            </div>
        </div>
    );
};

export default inject("store")(observer(MainPage));

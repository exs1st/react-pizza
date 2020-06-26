import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Header, Options } from "./";
import { GoodsList } from "components";
import { ISort } from "types";

interface IState {
    sorts: ISort[];
    sortIsOpen: boolean;
}
@inject("store")
@observer
export default class MainPage extends Component<{ store: any }> {
    state: IState = {
        sorts: [
            { id: 1, name: "популярности", active: true },
            { id: 2, name: "цене", active: false },
            { id: 3, name: "алфавиту", active: false },
        ],
        sortIsOpen: false,
    };

    componentDidMount() {
        this.props.store.fetchPizza();
    }

    changeSort = (id: number) => {
        const newSorts = this.state.sorts.map((sort) => {
            if (sort.id === id) {
                return { ...sort, active: true };
            } else if (sort.active) {
                return { ...sort, active: false };
            } else {
                return sort;
            }
        });
        this.setState({ sorts: newSorts, sortIsOpen: false });
    };

    sortOpen = () => {
        this.setState({
            sortIsOpen: !this.state.sortIsOpen,
        });
    };

    onFilterClick = (id: number) => {
        this.props.store.changeActive(id);
    };

    render() {
        const { sortIsOpen, sorts } = this.state;
        const {
            categories,
            allCount,
            totalPrice,
            pizzaCart,
            addToCart,
            getPizzaWithCategory,
            activeCategory,
        } = this.props.store;
        const pizzas = getPizzaWithCategory(activeCategory);
        return (
            <div className="home">
                <div className="container">
                    <Header
                        withCart={true}
                        allCount={allCount}
                        totalPrice={totalPrice}
                    />
                    <Options
                        filters={categories}
                        sorts={sorts}
                        onFilterClick={this.onFilterClick}
                        sortIsOpen={sortIsOpen}
                        sortOpen={this.sortOpen}
                        changeSort={this.changeSort}
                    />
                    <GoodsList
                        goods={pizzas}
                        pizzaCart={pizzaCart}
                        addToCart={addToCart}
                    />
                </div>
            </div>
        );
    }
}

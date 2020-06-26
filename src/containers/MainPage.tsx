import React, { Component } from "react";

import api from "api";
import { Header, Options } from "./";
import { GoodsList } from "components";
import { IFilter, ISort } from "types";

interface IState {
    pizzas: any[];
    filters: IFilter[];
    sorts: ISort[];
    sortIsOpen: boolean;
}

export default class MainPage extends Component {
    state: IState = {
        pizzas: [],
        filters: [
            { id: 1, name: "Все", active: true },
            { id: 2, name: "Мясные", active: false },
            { id: 3, name: "Вегетарианская", active: false },
            { id: 4, name: "Гриль", active: false },
            { id: 5, name: "Острые", active: false },
            { id: 6, name: "Закрытые", active: false },
        ],
        sorts: [
            { id: 1, name: "популярности", active: true },
            { id: 2, name: "цене", active: false },
            { id: 3, name: "алфавиту", active: false },
        ],
        sortIsOpen: false,
    };

    async componentDidMount() {
        const data = await api.getPizza();
        this.setState({
            pizzas: data,
        });
    }

    changeFilter = (id: number) => {
        const newFilters = this.state.filters.map((filter) => {
            if (filter.active) {
                return { ...filter, active: false };
            } else if (filter.id === id) {
                return { ...filter, active: true };
            } else {
                return filter;
            }
        });
        this.setState((prevState) => {
            return {
                ...prevState,
                filters: newFilters,
            };
        });
    };

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

    render() {
        const { filters, sortIsOpen, sorts, pizzas } = this.state;
        return (
            <div className="home">
                <div className="container">
                    <Header withCart={true} />
                    <Options
                        filters={filters}
                        sorts={sorts}
                        onFilterClick={this.changeFilter}
                        sortIsOpen={sortIsOpen}
                        sortOpen={this.sortOpen}
                        changeSort={this.changeSort}
                    />
                    <GoodsList goods={pizzas} />
                </div>
            </div>
        );
    }
}

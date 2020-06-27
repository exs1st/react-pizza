import React from "react";
import { observer } from "mobx-react";

import { ISort } from "types";

interface IProps {
    filters: any[];
    sorts: ISort[];
    onFilterClick: Function;
    handleSortToClick: Function;
    sortIsOpen: boolean;
    sortOpen: () => void;
    changeSort: (id: number) => void;
    sortTo: number;
}

function Options({
    filters,
    sorts,
    onFilterClick,
    sortIsOpen,
    sortOpen,
    changeSort,
    handleSortToClick,
    sortTo,
}: IProps) {
    const activeSort = sorts.find((sort) => sort.active)!;
    const sortLabelClass = sortTo === 1 ? "reverse" : "";
    return (
        <div className="options">
            <div className="options__filters">
                {filters &&
                    filters.map(({ id, name, active }) => {
                        const activeClass = active ? "active" : "";
                        return (
                            <button
                                key={id}
                                className={`options__filters__btn ${activeClass}`}
                                onClick={() => onFilterClick(id)}
                            >
                                {name}
                            </button>
                        );
                    })}
            </div>
            <div className="options__sort">
                <div className="options__sort__label">
                    <svg
                        className={`options__sort__label__arrow ${sortLabelClass}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleSortToClick()}
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69076 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>

                    <span className="options__sort__label__title">
                        Сортировка по:
                    </span>
                    <span
                        className="options__sort__label__current"
                        onClick={sortOpen}
                    >
                        {activeSort.name}
                    </span>
                </div>

                {sortIsOpen && (
                    <ul className="options__sort__select">
                        {sorts &&
                            sorts.map(({ id, name, active }) => {
                                const sortActiveClass = active ? "active" : "";
                                return (
                                    <li
                                        key={id}
                                        className={`options__sort__select__item ${sortActiveClass}`}
                                        onClick={() => changeSort(id)}
                                    >
                                        {name}
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default observer(Options);

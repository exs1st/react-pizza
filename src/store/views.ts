import { IDough, IPizza } from "types";

export function MainStoreViews(self: any) {
    return {
        getPizza(): IPizza[] {
            const { activeCategory, pizzas, activeSort, sortTo } = self;
            let filteredPizza = [];
            if (activeCategory === 0) {
                filteredPizza = pizzas;
            } else {
                filteredPizza = pizzas.filter(
                    (pizza: IPizza) => pizza.category === activeCategory
                );
            }
            let sortArr = [];

            switch (activeSort) {
                case 1: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a: IPizza, b: IPizza) => {
                            return sortTo === 0
                                ? a.rating - b.rating
                                : b.rating - a.rating;
                        });
                    break;
                }
                case 2: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a: IPizza, b: IPizza) =>
                            sortTo === 0 ? a.price - b.price : b.price - a.price
                        );
                    break;
                }

                case 3: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a: IPizza, b: IPizza) => {
                            if (sortTo === 0) {
                                if (a.name < b.name) {
                                    return -1;
                                }
                                if (a.name > b.name) {
                                    return 1;
                                }
                            } else {
                                if (a.name > b.name) {
                                    return -1;
                                }
                                if (a.name < b.name) {
                                    return 1;
                                }
                            }
                            return 0;
                        });
                    break;
                }
                default: {
                    return (sortArr = filteredPizza);
                }
            }
            return sortArr;
        },
        getDough(id: number) {
            return self.dough.find((dough: IDough) => dough.id === id);
        },
    };
}

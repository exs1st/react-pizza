import { types, flow } from "mobx-state-tree";
import CartModel from "./Cart";
import PizzaModel from "./Pizza";
import api from "api";

const CategoriesModel = types.model("Categories", {
    id: types.number,
    name: types.string,
    active: types.boolean,
});

const SortsModel = types.model("Sorts", {
    id: types.number,
    name: types.string,
    active: types.boolean,
});

const DoughModel = types.model("Dough", {
    id: types.number,
    name: types.string,
});

const Store = types
    .model("Store", {
        pizzas: types.array(PizzaModel),
        pizzaCart: types.array(CartModel),
        allCount: types.number,
        totalPrice: types.number,
        categories: types.array(CategoriesModel),
        activeCategory: types.number,
        sorts: types.array(SortsModel),
        sortIsOpen: types.boolean,
        activeSort: types.number,
        sortTo: types.number,
        dough: types.array(DoughModel),
    })
    .actions((self) => ({
        fetchPizza: flow(function* () {
            const data = yield api.getPizza();
            self.pizzas = data;
        }),
        fetchOnePizza: flow(function* (id: number) {
            const data = yield api.getOnePizza(id);
            return data;
        }),
        addToCart(pizzaId: number, dough: number, size: number, price: number) {
            let cartId = self.pizzaCart.length + 1;
            let sameOrder: any = self.pizzaCart.find(
                (pizzaOrder) =>
                    pizzaOrder.pizzaId === pizzaId &&
                    pizzaOrder.dough === dough &&
                    pizzaOrder.size === size
            );

            self.allCount++;
            self.totalPrice += price;

            if (sameOrder) {
                let sameOrderIndex = self.pizzaCart.indexOf(sameOrder);
                self.pizzaCart[sameOrderIndex].count++;
                return;
            }

            self.pizzaCart.push({
                id: cartId,
                pizzaId,
                dough,
                size,
                price,
                count: 1,
            });
        },
        changeActive(id: number) {
            const newCategories: any = self.categories.map((category) => {
                if (category.active && category.id === id) {
                    return category;
                }
                if (category.active) {
                    return { ...category, active: false };
                } else if (category.id === id) {
                    return { ...category, active: true };
                } else {
                    return category;
                }
            });
            self.activeCategory = id;
            self.categories = newCategories;
        },
        changeSort(id: number) {
            const { sorts } = self;
            const newSorts: any = sorts.map((sort: any) => {
                if (sort.id === id) {
                    return { ...sort, active: true };
                } else if (sort.active) {
                    return { ...sort, active: false };
                } else {
                    return sort;
                }
            });
            self.sorts = newSorts;
            self.sortIsOpen = false;
            self.activeSort = id;
        },
        handleSortOpen() {
            self.sortIsOpen = !self.sortIsOpen;
        },
        handleSortToClick() {
            self.sortTo = self.sortTo === 0 ? 1 : 0;
        },
    }))
    .views((self) => ({
        getPizza() {
            const { activeCategory, pizzas, activeSort, sortTo } = self;
            let filteredPizza = [];
            if (activeCategory === 0) {
                filteredPizza = pizzas;
            } else {
                filteredPizza = pizzas.filter(
                    (pizza) => pizza.category === activeCategory
                );
            }
            let sortArr = [];

            switch (activeSort) {
                case 1: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a, b): any =>
                            sortTo === 0
                                ? a.rating - b.rating
                                : b.rating - a.rating
                        );
                    break;
                }
                case 2: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a, b): any =>
                            sortTo === 0 ? a.price - b.price : b.price - a.price
                        );
                    break;
                }

                case 3: {
                    sortArr = filteredPizza.slice().sort((a, b): any => {
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
            return self.dough.find((dough) => dough.id === id);
        },
    }));

const store = Store.create({
    pizzas: [],
    pizzaCart: [
        {
            count: 8,
            dough: 1,
            id: 1,
            pizzaId: 3,
            price: 275,
            size: 26,
        },
        {
            count: 2,
            dough: 1,
            id: 2,
            pizzaId: 2,
            price: 275,
            size: 30,
        },
    ],
    allCount: 0,
    totalPrice: 0,
    categories: [
        { id: 0, name: "Все", active: true },
        { id: 1, name: "Мясные", active: false },
        { id: 2, name: "Вегетарианская", active: false },
        { id: 3, name: "Гриль", active: false },
        { id: 4, name: "Острые", active: false },
        { id: 5, name: "Закрытые", active: false },
    ],
    activeCategory: 0,
    sorts: [
        { id: 1, name: "популярности", active: true },
        { id: 2, name: "цене", active: false },
        { id: 3, name: "алфавиту", active: false },
    ],
    activeSort: 1,
    sortIsOpen: false,
    sortTo: 0,
    dough: [
        { id: 0, name: "Тонкое" },
        { id: 1, name: "Традиционное" },
    ],
});

export default store;

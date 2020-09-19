import { types, flow } from "mobx-state-tree";
import CartModel from "./Cart";
import PizzaModel from "./Pizza";
import api from "api";
import { IPizza } from "types";

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

function UpdateLocalStorage(self: any) {
    let cartJson = JSON.stringify(self.pizzaCart);
    localStorage.setItem("cart", cartJson);
    localStorage.setItem("allCount", self.allCount.toString());
    localStorage.setItem("totalPrice", self.totalPrice.toString());
}

export const Store = types
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
            let sameOrder = self.pizzaCart.find(
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
            } else {
                self.pizzaCart.push({
                    id: cartId,
                    pizzaId,
                    dough,
                    size,
                    price,
                    count: 1,
                });
            }
            UpdateLocalStorage(self);
        },
        changeActive(id: number) {
            let categoryWithActive = self.categories.find(
                (category) => category.active === true
            )!;
            let categoryById = self.categories.find(
                (category) => category.id === id
            )!;
            let indexCategoryWithActive = self.categories.indexOf(
                categoryWithActive
            );
            let indexCategoryById = self.categories.indexOf(categoryById);
            if (indexCategoryWithActive !== indexCategoryById) {
                self.categories[indexCategoryWithActive].active = false;
                self.categories[indexCategoryById].active = true;
                self.activeCategory = id;
            }
        },
        changeSort(id: number) {
            const { sorts } = self;
            let sortByActive = sorts.find((sort) => sort.active)!;
            let sortById = sorts.find((sort) => sort.id === id)!;
            let indexSortByActive = sorts.indexOf(sortByActive);
            let indexSortById = sorts.indexOf(sortById);
            if (indexSortById !== indexSortByActive) {
                self.sorts[indexSortByActive].active = false;
                self.sorts[indexSortById].active = true;
                self.sortIsOpen = false;
                self.activeSort = id;
            }
        },
        handleSortOpen() {
            self.sortIsOpen = !self.sortIsOpen;
        },
        handleSortToClick() {
            self.sortTo = self.sortTo === 0 ? 1 : 0;
        },
        changeCountPizzaInCart(id: number, value: number) {
            let order = self.pizzaCart.find((order) => order.id === id);

            if (order) {
                let orderIndex = self.pizzaCart.indexOf(order);
                if (self.pizzaCart[orderIndex].count === 1 && value === -1) {
                    self.pizzaCart.remove(order);
                    return;
                }
                if (value === -1) {
                    self.totalPrice -= order.price;
                    self.allCount--;
                } else {
                    self.totalPrice += order.price;
                    self.allCount++;
                }
                self.pizzaCart[orderIndex].count += value;
            }

            UpdateLocalStorage(self);
        },
        deleteOrderFromCart(id: number) {
            let orderForDelete = self.pizzaCart.find(
                (order) => order.id === id
            );
            if (orderForDelete) {
                self.pizzaCart.remove(orderForDelete);
                self.allCount -= orderForDelete.count;
                self.totalPrice -= orderForDelete.price * orderForDelete.count;
            }
            UpdateLocalStorage(self);
        },
        clearCart() {
            self.pizzaCart.clear();
            self.totalPrice = 0;
            self.allCount = 0;
            UpdateLocalStorage(self);
        },
    }))
    .views((self) => ({
        getPizza(): IPizza[] {
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
                        .sort((a, b) =>
                            sortTo === 0
                                ? a.rating - b.rating
                                : b.rating - a.rating
                        );
                    break;
                }
                case 2: {
                    sortArr = filteredPizza
                        .slice()
                        .sort((a, b) =>
                            sortTo === 0 ? a.price - b.price : b.price - a.price
                        );
                    break;
                }

                case 3: {
                    sortArr = filteredPizza.slice().sort((a, b) => {
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

const initStoreCartValue =
    localStorage.getItem("cart") !== null
        ? JSON.parse(localStorage.getItem("cart")!)
        : [];
const initStoreTotalPrice =
    localStorage.getItem("totalPrice") !== null
        ? Number(localStorage.getItem("totalPrice"))!
        : 0;
const initStoreAllCountValue =
    localStorage.getItem("allCount") !== null
        ? Number(localStorage.getItem("allCount"))!
        : 0;

const store = Store.create({
    pizzas: [],
    pizzaCart: initStoreCartValue,
    allCount: initStoreAllCountValue,
    totalPrice: initStoreTotalPrice,
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

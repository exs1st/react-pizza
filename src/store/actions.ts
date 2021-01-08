import { flow } from "mobx-state-tree";

import api from "api";

import { UpdateLocalStorage } from "./helpers";
import { ICart, ICategory, ISort } from "types";

export function MainStoreActions(self: any) {
    return {
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
                (pizzaOrder: ICart) =>
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
                (category: ICategory) => category.active === true
            )!;
            let categoryById = self.categories.find(
                (category: ICategory) => category.id === id
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
            let sortByActive = sorts.find((sort: ISort) => sort.active)!;
            let sortById = sorts.find((sort: ISort) => sort.id === id)!;
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
            let order = self.pizzaCart.find((order: ICart) => order.id === id);

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
                (order: ICart) => order.id === id
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
    };
}

import { types, flow } from "mobx-state-tree";
import CartModel from "./Cart";
import PizzaModel from "./Pizza";
import api from "api";

const CategoriesModel = types.model("Categories", {
    id: types.number,
    name: types.string,
    active: types.boolean,
});
const Store = types
    .model("Store", {
        pizzas: types.array(PizzaModel),
        pizzaCart: types.array(CartModel),
        allCount: types.number,
        totalPrice: types.number,
        categories: types.array(CategoriesModel),
        activeCategory: types.number,
    })
    .actions((self) => ({
        fetchPizza: flow(function* () {
            const data = yield api.getPizza();
            self.pizzas = data;
        }),
        addToCart(
            pizzaId: number,
            dough: number,
            size: number,
            price: number,
            count: number
        ) {
            self.allCount++;
            self.totalPrice += price;
            const pizzaInCart = self.pizzaCart.find(
                (pizza) => pizza.pizzaId === pizzaId
            );
            return self.pizzaCart.push({
                id: self.pizzaCart.length + 1,
                pizzaId,
                dough: [dough],
                size: [size],
                price,
                count: pizzaInCart ? pizzaInCart.count++ : 1,
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
    }))
    .views((self) => ({
        getPizzaWithCategory(id: number) {
            if (id === 0) return self.pizzas;
            return self.pizzas.filter((pizza) => pizza.category === id);
        },
    }));

const store = Store.create({
    pizzas: [],
    pizzaCart: [],
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
});

export default store;

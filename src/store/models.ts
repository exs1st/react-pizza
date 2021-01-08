import { types } from "mobx-state-tree";

export const CategoriesModel = types.model("Categories", {
    id: types.number,
    name: types.string,
    active: types.boolean,
});

export const SortsModel = types.model("Sorts", {
    id: types.number,
    name: types.string,
    active: types.boolean,
});

export const DoughModel = types.model("Dough", {
    id: types.number,
    name: types.string,
});

export const CartModel = types.model("Cart", {
    id: types.number,
    pizzaId: types.number,
    dough: types.number,
    size: types.number,
    price: types.number,
    count: types.number,
});

export const PizzaModel = types.model("Pizza", {
    id: types.number,
    imageUrl: types.string,
    name: types.string,
    types: types.array(types.number),
    sizes: types.array(types.number),
    price: types.number,
    category: types.number,
    rating: types.number,
});

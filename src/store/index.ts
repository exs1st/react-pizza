import { types } from "mobx-state-tree";

import InitStore from "./InitStore";

import {
    CartModel,
    CategoriesModel,
    DoughModel,
    PizzaModel,
    SortsModel,
} from "./models";
import { MainStoreActions } from "./actions";
import { MainStoreViews } from "./views";

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
    .actions(MainStoreActions)
    .views(MainStoreViews);

const InitialStore = InitStore();
const store = Store.create({ ...InitialStore });

export default store;

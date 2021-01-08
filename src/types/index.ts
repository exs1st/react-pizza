import { Instance } from "mobx-state-tree";
import { Store } from "store";
import { CartModel, DoughModel, PizzaModel } from "store/models";

export type ICategory = {
    id: number;
    name: string;
    active: boolean;
};

export type ISort = {
    id: number;
    name: string;
    active: boolean;
};

export interface IStore extends Instance<typeof Store> {}
export interface ICart extends Instance<typeof CartModel> {}
export interface IPizza extends Instance<typeof PizzaModel> {}
export interface IDough extends Instance<typeof DoughModel> {}

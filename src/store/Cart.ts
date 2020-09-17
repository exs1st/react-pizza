import { types } from "mobx-state-tree";

export const Cart = types.model("Cart", {
    id: types.number,
    pizzaId: types.number,
    dough: types.number,
    size: types.number,
    price: types.number,
    count: types.number,
});

export default Cart;

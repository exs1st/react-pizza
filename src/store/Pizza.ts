import { types } from "mobx-state-tree";

const PizzaModel = types.model("Pizza", {
    id: types.number,
    imageUrl: types.string,
    name: types.string,
    types: types.array(types.number),
    sizes: types.array(types.number),
    price: types.number,
    category: types.number,
    rating: types.number,
});

export default PizzaModel;

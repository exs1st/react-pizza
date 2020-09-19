import { Store } from "store";
import { IStore } from "types";

describe("Main store tests", () => {
    let initialState: any;
    let store: IStore;

    beforeEach(() => {
        initialState = {
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
        };
    });

    it("Store should have the default values", () => {
        store = Store.create(initialState);

        expect(store.pizzas.length).toBe(0);
        expect(store.pizzaCart.length).toBe(0);
        expect(store.allCount).toBe(0);
        expect(store.totalPrice).toBe(0);
        expect(store.categories.length).toBe(6);
        expect(store.activeCategory).toBe(0);
        expect(store.sorts.length).toBe(3);
        expect(store.activeSort).toBe(1);
        expect(store.sortIsOpen).toBe(false);
        expect(store.sortTo).toBe(0);
        expect(store.dough.length).toBe(2);
    });
});

export default function InitStore() {
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

    return {
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
    };
}

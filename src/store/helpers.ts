export function UpdateLocalStorage(self: any) {
    let cartJson = JSON.stringify(self.pizzaCart);
    localStorage.setItem("cart", cartJson);
    localStorage.setItem("allCount", self.allCount.toString());
    localStorage.setItem("totalPrice", self.totalPrice.toString());
}

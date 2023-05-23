import { isLoggedInStore } from "./stores";
let isLoggedIn: boolean;
isLoggedInStore.subscribe((value) => {
    isLoggedIn = value;
});
export const getCartCount = async () => {
    if (isLoggedIn) {
        const response = await fetch('/api/v1/customer/cart-count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const cartCount: number = await response.json();
            return cartCount;
        }
    }
}

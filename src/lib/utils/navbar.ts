import { isLoggedInStore } from "./stores";

export const getCartCount = async () => {
    if (isLoggedInStore) {
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

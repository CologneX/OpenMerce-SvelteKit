import { refreshTokenUser } from "./refreshToken";
import { cartCountStore } from "./stores";

export const getCartCount = async () => {
    await refreshTokenUser();
    const response = await fetch('/api/v1/customer/cart-count', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const cartCount = await response.json();
        cartCountStore.set(cartCount.count);
    }
    else if (response.status === 401) {
        const response = await fetch('/api/v1/customer/cart-count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const cartCount = await response.json();
            cartCountStore.set(cartCount.count);
        }
    }
}

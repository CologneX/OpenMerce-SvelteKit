import type { CartProducts } from "../../app";
import { refreshTokenUser } from "./refreshToken";
import { isLoggedInStore } from "./stores";
let $isLoggedInStore = isLoggedInStore;
export const getCart = async () => {
    if ($isLoggedInStore) {
        const response = await fetch('/api/v1/customer/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 401) {
            await refreshTokenUser();
            const response = await fetch('/api/v1/customer/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const cartData: CartProducts[] = await response.json();
                console.log(cartData);
                return cartData;
            }
            else if (response.status === 404) {
                throw new Error('Start Shopping Now!');
            }

        }
        if (response.ok) {
            const cartData: CartProducts[] = await response.json();
            console.log(cartData);
            return cartData;
        }
        else if (response.status === 404) {
            throw new Error('Start Shopping Now!');
        }
    }
};


export const handleCheckItem = (itemID: string, state: boolean) => {
    const checkItem = fetch('/api/v1/customer/cart-checked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: itemID,
            state: state
        })
    });
};

export const handleDeleteItem = (itemID: string) => {
    fetch(`/api/v1/customer/cart?id=${itemID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    getCart();
};


export const handleAddItem = async (itemID: string) => {
    const response = await fetch(`/api/v1/customer/cart?id=${itemID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const cartData: CartProducts[] = await response.json();
        console.log(cartData);
        return cartData;
    }
}
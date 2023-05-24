import type { CartProducts } from "../../app";
import { refreshTokenUser } from "./refreshToken";
import { isLoggedInStore } from "./stores";
import { triggerToast } from "./toast";
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
            if (response.status === 404) {
                throw new Error('Start Shopping Now!');
            }
            const cartData: CartProducts[] = await response.json();
            return cartData;
        }
        if (response.status === 404) {
            throw new Error('Start Shopping Now!');
        }
        const cartData: CartProducts[] = await response.json();
        return cartData;
    }
    return [];
}



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


export const handleEditItem = async (itemID: string, quantity: number) => {

    const response = await fetch(`/api/v1/customer/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: itemID,
            quantity: quantity
        })
    });
    if (response.status === 409) {
        const res = await response.json();
        triggerToast(res.error, 'variant-filled-error')
    }
    else if (response.status === 401) {
        await refreshTokenUser();
        const response = await fetch(`/api/v1/customer/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: itemID,
                quantity: quantity
            })
        });
        if (response.status === 409) {
            const res = await response.json();
            triggerToast(res.error, 'variant-filled-error')
        }
        else if (response.status === 200) {
            getCart();
        }
    }
    else if (response.status === 200) {
        getCart();
    }
}






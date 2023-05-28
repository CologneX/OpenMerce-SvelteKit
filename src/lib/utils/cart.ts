import { goto } from "$app/navigation";
import type { CartProducts } from "../../app";
import { refreshTokenUser } from "./refreshToken";
import { isLoggedInStore } from "./stores";
import { triggerToast } from "./toast";
import { getCartCount } from "./navbar";
let isLoggedIn: boolean;
isLoggedInStore.subscribe((value) => {
    isLoggedIn = value;
});
export const getCart = async () => {
    if (isLoggedIn) {
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
        else if (response.status === 404) {
            throw new Error('Start Shopping Now!');
        }
        const cartData: CartProducts[] = await response.json();
        return cartData;
    }
    return [];
}



export const handleCheckItem = async (itemID: string, state: boolean) => {
    const response = await fetch('/api/v1/customer/cart-checked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: itemID,
            state: state
        })
    });
    if (response.status === 401) {
        await refreshTokenUser();
        const response = await fetch('/api/v1/customer/cart-checked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: itemID,
                state: state
            })
        });
    }
};

export const handleDeleteItem = async (itemID: string) => {
    const response = await fetch(`/api/v1/customer/cart?id=${itemID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        getCartCount();
    }
    if (response.status === 401) {
        await refreshTokenUser();
        const response = await fetch(`/api/v1/customer/cart?id=${itemID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else if (response.status === 200) {
        getCartCount();
    }
};



export const handleEditItem = async (itemID: string, quantity: number) => {
    if (isLoggedIn) {
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
        if (response.status === 400) {
            const res = await response.json();
            triggerToast(res.error, 'variant-filled-error')
        }
        else if (response.status === 200) {
            getCartCount();
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
            if (response.status === 400) {
                const res = await response.json();
                triggerToast(res.error, 'variant-filled-error')
            } else if (response.status === 200) {
                getCartCount();
            }

        }
    }
    else {
        triggerToast('Please Login to Continue', 'variant-filled-error')
        goto('/login');
    }


}






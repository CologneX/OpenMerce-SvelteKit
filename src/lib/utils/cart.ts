import { goto } from "$app/navigation";
import type { CartProducts } from "../../app";
import { refreshTokenUser } from "./refreshToken";
import { isLoggedInStore} from "./stores";
import { triggerToast } from "./toast";
import { getCartCount } from "./navbar";
import { get } from "svelte/store";

export const getCart = async () => {
    if (get(isLoggedInStore)) {
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
                throw new Error('You dont have any items in your cart!');
            }
            const cartData: CartProducts[] = await response.json();
            return cartData;
        }
        else if (response.status === 404) {
            throw new Error('You dont have any items in your cart!');
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
    if (response.status === 401) {
        await refreshTokenUser();
        const response = await fetch(`/api/v1/customer/cart?id=${itemID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            getCart();
            getCartCount();
        }
    }
    if (response.status === 200) {
        getCart();
        getCartCount();
    }
};



export const handleEditItem = async (itemID: string, quantity: number) => {
    if (get(isLoggedInStore)) {
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

        if (response.status === 200) {
            triggerToast('Product added to cart!', 'variant-filled-success');
            getCartCount();
        }
        if (!response.ok) {
            const res = await response.json();
            triggerToast(res.error, 'variant-filled-error');
        }
        else if (response.status === 401) {
            await refreshTokenUser();
            const responseAgain = await fetch(`/api/v1/customer/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: itemID,
                    quantity: quantity
                })
            });
            const res = await response.json();
            if (responseAgain.status === 400) {
                triggerToast(res.error, 'variant-filled-error')
            } else if (responseAgain.status === 200) {
                triggerToast('Product added to cart!', 'variant-filled-success');
                getCartCount();
            }
            else if (!responseAgain.ok) {
                triggerToast((response.statusText), 'variant-filled-error');
            }

        }
    }
    else {
        triggerToast('Please Login to Continue', 'variant-filled-error')
        goto('/login');
    }


}

export const handleEditItemStock = async (itemID: string, quantity: number) => {
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
        }
    }
}

export const handleSendToWishlist = async (itemID: string) => {
    const response = await fetch(`/api/v1/customer/wishlist?id=${itemID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 401) {
        await refreshTokenUser();
        const response = await fetch(`/api/v1/customer/wishlist?id=${itemID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

import { refreshTokenUser } from "./refreshToken";
export const getCart = async () => {
    let cartData: CartProducts[] = [];
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
            cartData = await response.json();
            cartData;
        }
        else if (response.status === 404) {
            throw new Error('Start Shopping Now!');
        }

    }

    else if (response.status === 404) {
        throw new Error('Start Shopping Now!');
    }
    cartData = await response.json();
    return cartData;
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
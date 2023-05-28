import { goto } from "$app/navigation";
import { isLoggedInStore } from "./stores";

export const logoutUser = async () => {
    const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        isLoggedInStore.set(false)
        goto('/login');
    }
}

export const isLoggedIn = () => {
    if (localStorage.getItem('first_name') !== null) {
        isLoggedInStore.set(true)
    }
}

export const getUserNames = () => {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    return [firstName, lastName];
};


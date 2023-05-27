import { goto } from "$app/navigation";
import { isLoggedInStore, isStaffLoggedInStore } from "./stores";




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
export const logoutStaff = async () => {
    const response = await fetch('/api/v1/staff/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        localStorage.removeItem('username');
        localStorage.removeItem('sys_admin');
        localStorage.removeItem('fin_user');
        localStorage.removeItem('inv_admin');
        isStaffLoggedInStore.set(false)
        goto('/staff/login');
    }

}

export const isLoggedIn = () => {
    if (localStorage.getItem('first_name') !== null) {
        isLoggedInStore.set(true)
    }
    if (localStorage.getItem('username') !== null) {
        isStaffLoggedInStore.set(true)
    }

}

export const isStaffLogged = () => {
    return !!localStorage.getItem('username');
}

export const isSysAdmin = () => {
    return localStorage.getItem('sys_admin') === 'true';
}

export const isFinUser = () => {
    return localStorage.getItem('fin_user') === 'true';
}

export const isInvAdmin = () => {
    return localStorage.getItem('inv_admin') === 'true';
}

export const getStaffUsername = () => {
    return localStorage.getItem('username');
}

export const getUserNames = () => {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    return [firstName, lastName];
};


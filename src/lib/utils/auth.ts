import { isLoggedInStore, isStaffLoggedInStore } from "./stores";
export const logoutUser = () => {
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    isLoggedInStore.set(false)
}

export const isUserLoggedIn = () => {
    return localStorage.getItem('first_name') !== null;
}

export const logoutStaff = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('sys_admin');
    localStorage.removeItem('fin_user');
    localStorage.removeItem('inv_admin');
    isStaffLoggedInStore.set(false)
}

export const isStaffLogged = () => {
    return localStorage.getItem('username') !== null;
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

export const getUserFirstName = () => {
    return localStorage.getItem('first_name');
}

export const getUserLastName = () => {
    return localStorage.getItem('last_name');
}
let isLoggedIn = isUserLoggedIn();

$: {
    isLoggedIn = isUserLoggedIn();
    console.log(`Is user logged in? ${isLoggedIn}`);
}
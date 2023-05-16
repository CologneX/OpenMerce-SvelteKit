import { error } from "@sveltejs/kit";
export const refreshTokenUser = async () => {
    const response = await fetch('/api/v1/auth/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw error(response.status, {
            message: `${response.statusText}, please login again!`
        });
    }
};

export const refreshTokenStaff = async () => {
    const response = await fetch('/api/v1/customer/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw error(response.status, {
            message: `${response.statusText}, please login again!`
        });
    }
};
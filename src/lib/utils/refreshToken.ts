import { get } from "svelte/store";
import { logoutUserLocal } from "./auth";
export const refreshTokenUser = async () => {
    const response = await fetch('/api/v1/auth/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 401) {
        logoutUserLocal();
    }
};
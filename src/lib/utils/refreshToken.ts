import { goto } from "$app/navigation";
import { error } from "@sveltejs/kit";
import { logoutUser, logoutStaff } from "./auth";
export const refreshTokenUser = async () => {
    const response = await fetch('/api/v1/auth/refresh', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 401) {
        logoutUser();
    }
};

export const refreshTokenStaff = async () => {
    const response = await fetch('/api/v1/customer/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  if(response.status == 401){
    logoutStaff();
  }
};
import { logoutUserLocal } from "./auth";

let isRefreshing = false; // Track if a token refresh is already in progress
let refreshQueue: any = []; // Queue to hold pending requests

export const refreshTokenUser = async () => {
  if (isRefreshing) {
    // If a refresh is already in progress, add the request to the queue
    return new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await fetch("/api/v1/auth/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      logoutUserLocal();
      throw new Error("Unauthorized");
    }

    // Token refresh was successful
    const data = await response.json();

    // Update your access token and handle it accordingly
    // For example, you can update a Svelte store with the new token

    // Resolve all pending requests with the new access token
    while (refreshQueue.length > 0) {
      const request = refreshQueue.shift();
      request.resolve(data.accessToken);
    }
  } catch (error) {
    // Handle any errors during token refresh
    console.error("Error refreshing token:", error);

    // Reject all pending requests with the error
    while (refreshQueue.length > 0) {
      const request = refreshQueue.shift();
      request.reject(error);
    }
  } finally {
    isRefreshing = false;
  }
};

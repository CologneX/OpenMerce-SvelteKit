import { writable } from "svelte/store";

export const isLoggedInStore = writable(false);
export const isStaffLoggedInStore = writable(false);
export const screenWidthStore = writable(0);
export const isWishlistedStore = writable(false);
export const urlFromStore = writable("");
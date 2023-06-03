import { writable } from "svelte/store";

export const isLoggedInStore = writable(false);
export const screenWidthStore = writable(0);
export const isWishlistedStore = writable(false);
export const subTotalStore = writable(0);
export const scrollYStore = writable(0);
export const productLoadingStore = writable(true);
export const defaultAreaCode = writable("49101");
export const cartCountStore = writable(0);
export const defaultLocationStore = writable({ id: 25410, name: 'Jakarta Pusat' });
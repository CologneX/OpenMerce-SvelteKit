import { writable } from "svelte/store";
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import type { AddressDefault } from "../../app";
export const isLoggedInStore = writable(false);
export const screenWidthStore = writable(0);
export const isWishlistedStore = writable(false);
export const subTotalStore = writable(0);
export const scrollYStore = writable(0);
export const cartCountStore = writable(0);
export const defaultLocationStore: Writable<AddressDefault> = localStorageStore('loc', { id: 25410, name: 'Jakarta Pusat', address_id: null });
export const totalItemsStore = writable(0);


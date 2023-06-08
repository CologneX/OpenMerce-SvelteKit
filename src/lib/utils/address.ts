
import { modalStore } from "@skeletonlabs/skeleton";
import { refreshTokenUser } from "./refreshToken";
import { defaultLocationStore } from "./stores";
import type { AddressDetail, AddressType } from "../../app";
import { triggerToast } from "./toast";

export const handleLoadAddress = async () => {
    const response = await fetch('/api/v1/customer/address', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status == 401) {
        await refreshTokenUser();
        const response = await fetch('/api/v1/customer/address', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status == 200) {
            const data: AddressType[] = await response.json();
            return data;
        }
    } else if (response.status == 200) {
        const data: AddressType[] = await response.json();
        return data;
    }
    return [];
};

export const handleLoginSetLocation = async (id: string) => {
    const responseDetail = await fetch(`/api/v1/customer/address?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (responseDetail.ok) {
        const data: AddressDetail = await responseDetail.json();
        defaultLocationStore.set({ id: data.area_id, name: data.label, address_id: id });
        modalStore.clear();
        triggerToast('Address has been set', 'variant-filled-success');
    } else if (responseDetail.status === 401) {
        await refreshTokenUser();
        const responseDetail = await fetch(`/api/v1/customer/address?id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (responseDetail.ok) {
            const data: AddressDetail = await responseDetail.json();
            defaultLocationStore.set({ id: data.area_id, name: data.shipping_area, address_id: id });
            modalStore.clear();
            triggerToast('Address has been set', 'variant-filled-success');
        }
    }
};
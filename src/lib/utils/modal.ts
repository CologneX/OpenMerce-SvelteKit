import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
const listOfAddress: ModalComponent = {
	ref: Address,
}

const AddressModal: ModalSettings = {
	type: 'component',
	component: listOfAddress,
}

export const triggerModal = () => {
	modalStore.trigger(AddressModal);
}
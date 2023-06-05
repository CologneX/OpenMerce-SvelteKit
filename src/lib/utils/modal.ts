import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
import DeliverySimulation from '$lib/Modal/DeliverySimulation.svelte';
import AddressList from '$lib/Modal/AddressList.svelte';
import AddAddress from '$lib/Modal/AddAddress.svelte';


export const modalComponentRegistry: Record<string, ModalComponent> = {
	AddressComponent: {
		ref: Address,
	},
	DeliverySimulationComponent: {
		ref: DeliverySimulation,
	},
	AddressList: {
		ref: AddressList,
	},
	AddAdress: {
		ref: AddAddress,
	}
}

export const AddressModal: ModalSettings = {
	type: 'component',
	component: 'AddressComponent',
};

export const DeliverySimulationModal: ModalSettings = {
	type: 'component',
	component: 'DeliverySimulationComponent',
};

export const AddressListModal: ModalSettings = {
	type: 'component',
	component: 'AddressList',
};

export const AddAddressModal: ModalSettings = {
	type: 'component',
	component: 'AddAdress',
};
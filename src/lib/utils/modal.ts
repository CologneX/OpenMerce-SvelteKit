import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
import DeliverySimulation from '$lib/Modal/DeliverySimulation.svelte';


export const modalComponentRegistry: Record<string, ModalComponent> = {
	AddressComponent: {
		ref: Address,
	},

	DeliverySimulationComponent: {
		ref: DeliverySimulation,
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
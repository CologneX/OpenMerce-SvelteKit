import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
import DeliverySimulation from '$lib/Modal/DeliverySimulation.svelte';
import CheckoutFreight from '$lib/Modal/CheckoutFreight.svelte';


export const modalComponentRegistry: Record<string, ModalComponent> = {
	AddressComponent: {
		ref: Address,
	},
	DeliverySimulationComponent: {
		ref: DeliverySimulation,
	},
	CheckoutFreight: {
		ref: CheckoutFreight,
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

export const CheckoutFreightModal: ModalSettings = {
	type: 'component',
	component: 'CheckoutFreight',
};
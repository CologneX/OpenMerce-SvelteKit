import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings, ModalComponent, Modal } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
import DeliverySimulation from '$lib/Modal/DeliverySimulation.svelte';
import type { Freight, FreightDetail } from '../../app';
const AddressComponent: ModalComponent = {
	ref: Address,
}

const DeliverySimulationComponent: ModalComponent = {
	ref: DeliverySimulation,


}



export const AddressModal: ModalSettings = {
	type: 'component',
	component: AddressComponent,
}
export const DeliveryDetailsModal: ModalSettings = {
	type: 'component',
	component: DeliverySimulationComponent,

}

export const triggerDeliveryDetailsModal = (deliveryDetails: Freight[], weight: number) => {
	DeliveryDetailsModal.meta = {
		deliveryDetails: deliveryDetails,
		weight: weight
	}
	modalStore.trigger(DeliveryDetailsModal);
}

export const triggerModal = (modal: ModalSettings) => {
	modalStore.trigger(modal);
}
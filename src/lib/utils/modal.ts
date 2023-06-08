import type { ModalSettings, ModalComponent, Modal } from '@skeletonlabs/skeleton';
import Address from '$lib/Modal/Address.svelte';
import DeliverySimulation from '$lib/Modal/DeliverySimulation.svelte';
import AddressList from '$lib/Modal/AddressList.svelte';
import AddAddress from '$lib/Modal/AddAddress.svelte';
import TransactionDetails from '$lib/Modal/TransactionDetails.svelte';
import ReviewModal from '$lib/Modal/ReviewModal.svelte';
import ChangePassword from '$lib/Modal/ChangePassword.svelte';
import EditAddress from '$lib/Modal/EditAddress.svelte';


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
	},
	TransactionDetails: {
		ref: TransactionDetails,
	},
	Review: {
		ref: ReviewModal,
	},
	ChangePassword: {
		ref: ChangePassword
	},
	EditAddress: {
		ref: EditAddress,
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

export const TransactionDetailsModal: ModalSettings = {
	type: 'component',
	component: 'TransactionDetails'
};

export const ChangePasswordModal: ModalSettings = {
	type: 'component',
	component: 'ChangePassword'
}

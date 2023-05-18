import { modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';


export const triggerModal = (modal: ModalSettings) => {
	modalStore.trigger(modal);
}
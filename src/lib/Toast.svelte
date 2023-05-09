<script lang="ts">
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let messageText: string;
	export let type: string;
	
	export let t: ToastSettings = {
		message: messageText,
		background: `variant-ghost-${type}`
	};

	export const triggerToast = () => {
		toastStore.trigger(t);
	};
</script>

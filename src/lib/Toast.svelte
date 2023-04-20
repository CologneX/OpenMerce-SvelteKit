<script lang="ts">
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const t: ToastSettings = {
		message: 'This message has custom styles.',
		background: 'bg-primary',
		// Add your custom classes here:
		classes: 'border-4 border-purple-500'
	};

	// Trigger the toast
	export const triggerToast = () => {
		toastStore.trigger(t);
	};
</script>

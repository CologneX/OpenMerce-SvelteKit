<script lang="ts">
	import triggerToast from '$lib/Toast.svelte';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const t: ToastSettings = {
		message: 'This message has custom styles.',
		background: 'bg-primary',
		// Add your custom classes here:
		classes: 'border-4 border-purple-500'
	};

	interface items {
		id: string;
		name: string;
		price: number;
		quantity: number;
		rating: number;
	}
	export const itemsList: items[] = [
		{
			id: '1',
			name: 'Bread',
			price: 2.5,
			quantity: 1,
			rating: 4
		},
		{
			id: '2',
			name: 'Milk',
			price: 3.5,
			quantity: 1,
			rating: 5
		}
	];
</script>

<svelte:head>
	<title>OpenMerce | Main</title>
	<meta name="description" content="OpenMerce - Open Source E-Commerce" />
	<meta
		name="keywords"
		content="OpenMerce, E-Commerce, Open-Source ECommerce, Svelte, SvelteKit, OpenMerce Main, Main"
	/>
	<meta name="author" content="OpenMerce" />
</svelte:head>
<!-- <Toast position='br' /> -->
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-2">
		{#each itemsList as item}
			<a class="card p-4 w-24" href="products/{item.id}">{item.name}</a>
		{/each}
	</div>
</div>

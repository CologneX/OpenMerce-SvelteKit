<script lang="ts">
	import triggerToast from "$lib/Toast.svelte";
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const t: ToastSettings = {
		message: 'This message has custom styles.',
		background: 'bg-primary',
		// Add your custom classes here:
		classes: 'border-4 border-purple-500'
	};
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
	<div class="space-y-5">
		<h1>OpenMerce</h1>
		<p>Start by exploring:</p>
		<ul>
			<li>
				<code>/src/routes/+layout.svelte</code> - barebones layout, the CSS import order is critical!
			</li>
			<button on:click={()=>toastStore.trigger(t)}>BABI</button>
	
			<li>
				<code>/src/app.postcss</code> - minimal css to make the page full screen, may not be relevant
				for your project
			</li>
			<li><code>/src/routes/+page.svelte</code> - this page, you can replace the contents</li>
		</ul>
	</div>
</div>

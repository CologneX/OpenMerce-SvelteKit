<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoggedInStore, screenWidthStore } from '$lib/utils/stores';
	let isLoggedIn: boolean;
	import { register } from 'swiper/element/bundle';

	register();
	let screenWidth: number;
	let isLoading: boolean = true;
	import ProductCarousel from '$lib/Main/ProductCarousel.svelte';
	import BannerCarousel from '$lib/Main/BannerCarousel.svelte';
	onMount(async () => {
		isLoggedInStore.subscribe((value) => {
			isLoggedIn = value;
		});
		screenWidthStore.subscribe((value) => {
			screenWidth = value;
		});
	});
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
<div class="space-y-10 w-full h-full mt-6">
	<BannerCarousel />

	<div class="w-full">
		<div class="flex">
			<h4 class="font-semibold flex-1">For You</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>

		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card md:hidden">
			<!-- <ProductCarousel /> -->
		</div>

		<div class="w-full hidden md:block h-96">
			<!-- {#if !isLoading}
				<ProductCarousel {products} />
			{:else}
				<div class="w-full animate-pulse text-center placeholder h-full" />
			{/if} -->
			<ProductCarousel />
		</div>
	</div>
	<div class="w-full">
		<div class="flex">
			<h4 class="font-semibold flex-1">Special Promo for You!!</h4>
			<a href="/see-all" class=" decoration-transparent">See All</a>
		</div>

		<div class="grid grid-flow-col gap-1 overflow-x-auto hide-scrollbar card md:hidden">
			<!-- {#each products as item}
				<ProductCard products={item} />
			{/each} -->
			<!-- <ProductCarousel /> -->
		</div>

		<div class="w-full hidden md:block h-96">
			<!-- {#if !isLoading}
				<ProductCarousel {products} />
			{:else}
				<div class="w-full animate-pulse text-center placeholder h-full" />
			{/if} -->
			<ProductCarousel />
		</div>
	</div>

	<hr class="!border-t-8" />

	<div
		class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-5 justify-items-center h-96"
	>
		{#if !isLoading}
			<!-- {#each products as item}
				<ProductCard products={item} />
			{/each} -->
		{:else}
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
			<div class="w-full animate-pulse text-center placeholder h-full" />
		{/if}
	</div>
</div>
